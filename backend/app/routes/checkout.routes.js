module.exports = app => {
    const router = require("express").Router()
    const buyerMiddleware = require("../middlewares/buyer.middleware")
    const checkoutController = require("../controllers/checkout.controllers");
    const adminMiddleware = require("../middlewares/admin.middlewares");
    router.route("/orders").get(adminMiddleware.admin, checkoutController.getAllOrders)
    router.route("/add").post(buyerMiddleware.buyer, checkoutController.createOrder);
    
    app.use("/checkout", router);
}