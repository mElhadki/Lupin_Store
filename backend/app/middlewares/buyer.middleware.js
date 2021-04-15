let config = require("../config/secret.config");
let jwt = require('jsonwebtoken');




exports.buyer = (req, res, next) => {
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
            if(decoded.buyer == undefined || decoded.buyer == false){
                return res.send({
                    auth: false,
                    message: 'not authorized...'
                });
            }
            else{
                req.idBuyer = decoded.id;
                req.username = decoded.username;
                next();
            }
    })
}