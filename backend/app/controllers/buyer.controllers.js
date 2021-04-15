let Buyer = require("../models/buyer.models");
let bcrypt = require('bcryptjs');
let nodemailer = require("nodemailer");
let jwt = require('jsonwebtoken');
let config = require("../config/secret.config");


exports.login = async (req, res) => {

    var match = /^(0)([ \-_/]*)(\d[ \-_/]*){9}$/g;
    let phone = req.body.phone
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
     await   Buyer.findOne({ phone: phone }).select('password').select('valid').then((login) => { 
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
            else if (login.valid === false) {
                error.push("your account is not confirmer check your mail please !")
                res.json({ error: error });
                return;
            }
            else if(login.ban == true){
                error.push("your account is suspended please check your mail !")
                res.json({error : error});
                return;
            }
            else{
                var token = jwt.sign({
                    id: login._id,
                    username: login.username,
                    buyer : true
                }, config.secret, {
                    expiresIn: 86400
                })

                res.status(200).send({
                    auth: true,
                    token: token
                })
            }
        })
    }

}

exports.register = async (req, res) => {
    let username = req.body.username
    var match = /^(0)([ \-_/]*)(\d[ \-_/]*){9}$/g;
    var matchEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/g
    let phone = req.body.phone
    let passwordBrut = req.body.password;
    let password = bcrypt.hashSync(passwordBrut, 10)
    let fullname = req.body.fullname
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
    if (passwordBrut === "") {
        error.push("password is empty")
    }
    else if (passwordBrut.length <= 3) {
        error.push("password is short")
    }
    if (error.length > 0) {
        res.json({ error: error })
    }
    else{
        let buyerPush = new Buyer({
            fullname,
            phone,
            username,
            password,
            email
        })
      await buyerPush.save().then(async (response) => {
            let transporter =  nodemailer.createTransport({
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
                from: '"Lupper store ✈️" <elhadkimariem3@gmail.com>', // sender address
                to: response.email, // list of receivers
                subject: "Confirm your account!", // Subject line
                text: "Confirm !", // plain text body
                html: "Hello <b> " + response.fullname +" </b><br><p>This is your confirmation link : http://localhost:8080/buyers/valid/"+response._id, // html body
            }).then(() => res.json({notif : "email sended check your mail to activate your account"}))
        }).catch((err) => {
                
            if(err.name === 'MongoError' && err.code === 11000 && err.keyPattern.email === 1){
                error.push("email already exist")
            }
            if(err.name === 'MongoError' && err.code === 11000 && err.keyPattern.phone === 1){
                error.push("phone already exist")
            }
            if(err.name === 'MongoError' && err.code === 11000 && err.keyPattern.username === 1){
                error.push("usernames already exist")
            }
            res.json(error);
        })
    }
}

exports.confirmaccount = async (req, res) => {
   await Buyer.updateOne({ _id: req.params.id }, { $set: { valid: true } }).then(() => res.json("account approved !"))
        .catch((err) => res.json({error : "buyer not found"}))
}