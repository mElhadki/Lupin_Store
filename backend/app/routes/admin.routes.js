module.exports = app => {
    let adminController = require("../controllers/admin.controllers");
    let adminMiddleware = require("../middlewares/admin.middlewares");
    const router = require("express").Router();

    router.route("/login").post(adminController.loginAdmin);
    router.route("/register").post(adminController.createAdmin);
    router.route("/approve/:id").get(adminMiddleware.admin, adminController.approveAccount);
    
    router.route("/banSeller/:id").get(adminMiddleware.admin, adminController.suspendAccountSeller);
    router.route("/banBuyer/:id").get(adminMiddleware.admin, adminController.suspendBuyerAccount);
    app.use("/admin", router);
    
}