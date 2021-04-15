module.exports = app => {
    const router = require("express").Router();
    let controllerSeller = require("../controllers/seller.controllers");
    let adminMiddleware = require("../middlewares/admin.middlewares");
    let sellerMiddleware = require("../middlewares/seller.middleware");
    router.route("/register").post(controllerSeller.register);
    router.route("/login").post(controllerSeller.login);
    router.route("/valid/:id").get(controllerSeller.confirmaccount);
    router.route("/setPassword").put(sellerMiddleware.seller, controllerSeller.setPasswordSeller);
    router.route("/").get(adminMiddleware.admin, controllerSeller.getAllSellers)
    app.use("/sellers", router);
}