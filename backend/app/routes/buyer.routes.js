module.exports = app => {
    let router = require("express").Router();
    let buyerController = require("../controllers/buyer.controllers");
    let buyerMiddleware = require("../middlewares/buyer.middleware");
    router.route("/register").post(buyerController.register);
    router.route("/login").post(buyerController.login);
    router.route("/valid/:id").get(buyerController.confirmaccount);
    router.route("/checkBuyer").get(buyerMiddleware.buyer, (req, res) => res.json({token : "token valid", auth : true}))
    app.use("/buyers", router);
}