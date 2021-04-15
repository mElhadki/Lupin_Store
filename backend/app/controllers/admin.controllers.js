let Admin = require("../models/admin.models");
let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');
let Seller = require("../models/seller.models");
let Buyer = require("../models/buyer.models")
let config = require("../config/secret.config");
let nodemailer = require("nodemailer");

exports.loginAdmin = async (req, res) => {
    let phone = req.body.phone;
    var match = /^(0)([ \-_/]*)(\d[ \-_/]*){9}$/g;
    var password = req.body.password;
    var error = [];
    if (phone == "") {
        error.push("phone is empty")
    }
    else if (!phone.match(match)) {
        error.push("phone invalid")
    }
    if (password === "") {
        error.push("password is empty")
    }
    else if (password.length <= 3) {
        error.push("password is short")
    }

    if (error.length > 0) {
        res.json({ error: error })
    }
    else {
     await   Admin.findOne({
            phone: req.body.phone
        }).select('password').select('superadmin').select('username').then((admin) => {
            if (admin == null) {
                error.push("phone not found !")
                res.json({ error: error });
                return;
            }
            var passwordIsValid = bcrypt.compareSync(req.body.password, admin.password);
            if (!passwordIsValid) {
                error.push("credential error !")
                return res.json({
                    error: error
                });
            }
            var token = jwt.sign({
                id: admin._id,
                superadmin: admin.superadmin,
                username: admin.username
            }, config.secret, {
                expiresIn: 86400
            })
            res.status(200).send({
                auth: true,
                token: token
            })
        })
    }

}


exports.createAdmin = async (req, res) => {
    let phone = req.body.phone;
    var match = /^(0)([ \-_/]*)(\d[ \-_/]*){9}$/g;
    var passwordBrut = req.body.password;
    let superadmin = false
    var error = [];
    let username = req.body.username;
    let password = bcrypt.hashSync(passwordBrut, 8);
    if (username === "") {
        error.push("username is empty !")
    }
    else if (username < 4) {
        error.push("username is too short !");
    }
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
        var objPush = new Admin({
            username,
            password,
            phone,
            superadmin
        })
     await   objPush.save().then(admin => res.json(admin)).catch(err => {
            error.push((err.name === 'MongoError' && err.code === 11000) ? 'phone already exists !' : err)
            res.json({ error: error });
        }
        )

    }
}

exports.approveAccount = async (req, res) => {
    var error = [];
   await Seller.findOne({ _id: req.params.id }).then(async (data) => {
        if (data == null) {
            error.push('seller not found');
            res.json(error);
        }
        else {
            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true, // true for 465, false for other ports
                auth: {
                    user: "gitshopllc@gmail.com", // generated ethereal user
                    pass: "0646274243", // generated ethereal password
                },
            })
            // send mail with defined transport object
            let info = await transporter.sendMail({
                from: '"Lupper store 💍" <elhadkimariem3@gmail.com>', // sender address
                to: data.email, // list of receivers
                subject: "Account is approved !", // Subject line
                text: "Aprroved !", // plain text body
                html: "Hello <b> " + data.fullname + " </b><br><p>Your login : <br> <b>Phone :"+ data.phone +" </b> <br> <b>Password : "+data.tempPassword+"</b><p>This is your confirmation link : http://localhost:8080/sellers/valid/" + data._id, // html body
            }).then(() => res.json("email sended")).catch(function (err) {
                console.log(err)
            });
        }



    }).catch((err) => res.json({ error: ["id not found"] }))
}


exports.suspendAccountSeller = async (req, res) => {
   await Seller.findOne({ _id: req.params.id }).then(async (response) => {
        if (response == null) {
            res.json({ error: "seller not found" })
        }
        else {
           await Seller.updateOne({ _id: req.params.id }, { ban: true }).then(async () => {
                let transporter = nodemailer.createTransport({
                    host: "smtp.gmail.com",
                    port: 465,
                    secure: true, // true for 465, false for other ports
                    auth: {
                        user: "gitshopllc@gmail.com", // generated ethereal user
                        pass: "0646274243", // generated ethereal password
                    },
                })
                // send mail with defined transport object
                let info = await transporter.sendMail({
                    from: '"Lupper store 💍" <elhadkimariem3@gmail.com>', // sender address
                    to: data.email, // list of receivers
                    subject: "Your seller account is suspended !", // Subject line
                    text: "Suspended !", // plain text body
                    html: "Hello <b> " + data.fullname + " </b><br><p> We are writing to alert you that your LupperStore account has been suspended.<br>Per the User Agreement, Section 9, we may immediately issue a warning, temporarily suspend, indefinitely suspend or terminate your membership and refuse to provide our services to you if we believe that your actions may cause financial loss or legal liability for you, our users or us.<br>To remove any limitations. <br>Due to the suspension of this account, please be advised you are prohibited from using LupperStore in any way until you confirm your registration.Please note that this will also affect the ability to sell or bid on items.This includes registering a new account.<br>Sincerely,<br>Mike Jenice<br>Managing Director</p>", // html body
                }).then(() => res.json({ notif: "account seller suspended !" })).catch(function (err) {
                    console.log(err)
                });
            }).catch((err) => res.json(err))
        }
    })
}

exports.suspendBuyerAccount = async (req, res) => {
    await Buyer.findOne({ _id: req.params.id }).then(async (response) => {
        if (response == null) {
            res.json({ error: "buyer not found !" })
        }
        else {
         await   Buyer.updateOne({ _id: req.params.id }).then(async () => {
                let transporter = nodemailer.createTransport({
                    host: "smtp.gmail.com",
                    port: 465,
                    secure: true, // true for 465, false for other ports
                    auth: {
                        user: "gitshopllc@gmail.com", // generated ethereal user
                        pass: "0646274243", // generated ethereal password
                    },
                })
                // send mail with defined transport object
                let info = await transporter.sendMail({
                    from: '"Lupper store 💍" <elhadkimariem3@gmail.com>', // sender address
                    to: data.email, // list of receivers
                    subject: "Your Buyer account is suspended !", // Subject line
                    text: "Suspended !", // plain text body
                    html: "Hello <b> " + data.fullname + " </b><br><p> We are writing to alert you that your LupperStore account has been suspended.<br>Per the User Agreement, Section 9, we may immediately issue a warning, temporarily suspend, indefinitely suspend or terminate your membership and refuse to provide our services to you if we believe that your actions may cause financial loss or legal liability for you, our users or us.<br>To remove any limitations. <br>Due to the suspension of this account, please be advised you are prohibited from using LupperStore in any way until you confirm your registration.Please note that this will also affect the ability to sell or bid on items.This includes registering a new account.<br>Sincerely,<br>Mike Jenice<br>Managing Director</p>", // html body
                }).then(() => res.json({ notif: "account buyer suspended !" })).catch(function (err) {
                    console.log(err)
                });
            }).catch((err) => res.json(err))
        }
    })
}