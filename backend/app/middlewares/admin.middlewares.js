let config = require("../config/secret.config");
let jwt = require('jsonwebtoken');


exports.superadmin = (req, res, next) => {
    var token = req.headers['x-access-token'];
    if (!token)
        return res.status(403).send({
            auth: false,
            message: 'token please ...'
        });

    jwt.verify(token, config.secret, function (err, decoded) {
        if (err)
            return res.status(500).send({
                auth: false,
                message: 'false token'
            });

        else if (decoded.superadmin == false || decoded.superadmin == undefined) {
            return res.status(500).send({
                message: 'not authorized'
            });
        } else {
            req.idAdmin = decoded.id;
            req.username = decoded.username;
            req.superadmin = decoded.superadmin;
            next()
        }
    });
}


exports.admin = (req, res, next) => {
    var token = req.headers['x-access-token'];
    if (!token)
        return res.send({
            auth: false,
            message: 'token please ...'
        });

    jwt.verify(token, config.secret, function (err, decoded) {
        if (err)
            return res.send({
                auth: false,
                message: 'false token'
            });
            if(decoded.superadmin == undefined){
                return res.send({
                    auth: false,
                    message: 'not authorized...'
                });
            }
            else{
                req.idAdmin = decoded.id;
                req.username = decoded.username;
                req.superadmin = decoded.superadmin;
                next();
            }
    })
}