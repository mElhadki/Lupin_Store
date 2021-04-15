let bcrypt = require('bcryptjs');
let Seller = require("../models/seller.models");
let config = require("../config/secret.config");
let jwt = require('jsonwebtoken');
var generator = require('generate-password');
const multer = require("multer");
const util = require("util");
const maxSize = 100 * 1024 * 1024;

exports.login = (req, res) => {
    var match = /^(0)([ \-_/]*)(\d[ \-_/]*){9}$/g;
    let phone = req.body.phone;
    let passwordBrut = req.body.password;
    var error = [];

    if (phone == "") {
        error.push("phone is empty")
    }
    else if (!phone.match(match)) {
        error.push("phone invalid")
    }
    if (passwordBrut === "") {
        error.push("password is empty")
    }
    else if (passwordBrut.length <= 3) {
        error.push("password is short")
    }
    if (error.length > 0) {
        res.json({ error: error })
    }
    else {
        Seller.findOne({ phone: phone }).select('password').select('valid').select("username").select("firstLogin").then((login) => {
            if (login == null) {
                error.push("phone not found !")
                res.json({ error: error });
                return;
            }
            var passwordIsValid = bcrypt.compareSync(passwordBrut, login.password);
            if (!passwordIsValid) {
                error.push("credential error !")
                return res.json({
                    error: error
                });
            }
            // @ts-ignore
            else if (login.valid == false) {
                error.push("your account is inactive wait an admin approve u !")
                res.json({ error: error });
                return;
            }
            else if (login.ban == true) {
                error.push("your account is suspended please check your mail !")
                res.json({ error: error });
                return;
            }
            else {
                var token = jwt.sign({
                    id: login._id,
                    seller: true,
                    username: login.username
                }, config.secret, {
                    expiresIn: 86400
                })

                res.status(200).send({
                    auth: true,
                    firstLogin: login.firstLogin,
                    token: token
                })
            }
        })

    }
};

exports.setPasswordSeller = (req, res) => {
    Seller.findOne({ _id: req.idSeller }).then((response) => {

        if (response == null) {
            res.json({ error: "seller not found !" })
        }

        else {
            let passwordBrut = req.body.password;
            var error = [];
            if (response.firstLogin == false) {
                error.push("expired !");
            }
            else if (passwordBrut === "") {
                error.push("password is empty !")
            }
            else if (passwordBrut.length < 4) {
                error.push("password is too short")
            }
            else if (passwordBrut === response.tempPassword) {
                error.push("please choose a new password");
            }

            if (error.length > 0) {
                res.json({ error: error });
            }
            else {
                let password = bcrypt.hashSync(passwordBrut, 10);
                Seller.updateOne({ _id: req.idSeller }, { $set: { password: password, firstLogin: false }, $unset: { tempPassword: "" } }).then(() => res.json("password seller updated !")).catch((err) => res.json(err))
            }
        }
    })
}

exports.register = async (req, res) => {
    let storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, __basedir + "/app/fiscaPdf");
        },
        filename: (req, file, cb) => {
            console.log(file.originalname);
            cb(null, file.originalname);
        },
    });

    let uploadFile = multer({
        storage: storage,
        limits: {
            fileSize: maxSize
        },
    }).single("file");

    let uploadFileMiddleware = util.promisify(uploadFile);

    try {
        await uploadFileMiddleware(req, res);
        if (req.file == undefined) {
            return res.status(400).send({ message: "Please upload a file!" });
        }

    } catch (err) {
        if (err.code == "LIMIT_FILE_SIZE") {
            return res.status(500).send({
                message: "File size cannot be larger than 2MB!",
            });
        }

        res.status(500).send({
            message: `Could not upload the file: ${req.file.originalname}. ${err}`,
        });
    }
    let username = req.body.username
    var match = /^(0)([ \-_/]*)(\d[ \-_/]*){9}$/g;
    var matchEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/g
    let phone = req.body.phone;
    let tempPassword = generator.generate({ length: 10, numbers: true });
    let password = bcrypt.hashSync(tempPassword, 10);
    let fullname = req.body.fullname;
    let packChoose = req.body.pack;
    let email = req.body.email
    var error = [];
    if (fullname === "") {
        error.push("full name is empty !")
    }
    else if (fullname.length < 5) {
        error.push("full name is too short !");
    }

    if (username === "") {
        error.push("username is empty !")
    }
    else if (username.length < 4) {
        error.push("username is too short !");
    }
    if (phone == "") {
        error.push("phone is empty")
    }
    else if (!phone.match(match)) {
        error.push("phone invalid")
    }
    if (email == "") {
        error.push("email is empty")
    }
    else if (!email.match(matchEmail)) {
        error.push("email invalid")
    }

    if (error.length > 0) {
        res.json({ error: error })
    }
    else {
        let pdfFisca = req.file.originalname;
        var sellerPush = new Seller({
            fullname,
            phone,
            username,
            password,
            tempPassword,
            packChoose,
            email,
            pdfFisca
        })
        sellerPush.save().then((response) => res.json({ data: response, Notification: "wait an admin confirm your account" })).catch((err) => {
            if (err.name === 'MongoError' && err.code === 11000 && err.keyPattern.email === 1) {
                error.push("email already exist")
            }
            if (err.name === 'MongoError' && err.code === 11000 && err.keyPattern.phone === 1) {
                error.push("phone already exist")
            }
            if (err.name === 'MongoError' && err.code === 11000 && err.keyPattern.username === 1) {
                error.push("usernames already exist")
            }
            res.json(err);
        }).catch((err) => res.json(err))
    }
}

exports.confirmaccount = (req, res) => {
    Seller.findOne({ _id: req.params.id }).then(async (response) => {
        if (response == null) {
            res.json({ error: "id not found" });
        }
        else {
            await Seller.updateOne({ _id: req.params.id }, { $set: { valid: true } }).then(() => res.json("account approved !"))
                .catch((err) => res.json(err))
        }
    }).catch(() => res.json({ error: "id not found" }));

}

exports.getAllSellers = (req, res) => {
    Seller.find().populate("packChoose").then((success) => res.json(success)).catch((err) => res.json(err))
}

