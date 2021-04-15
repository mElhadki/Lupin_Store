module.exports = app => {
    const router = require("express").Router();
    const cartController = require("../controllers/cart.controllers");
    const buyerMiddleware = require("../middlewares/buyer.middleware");
    router.route("/add").post(buyerMiddleware.buyer, cartController.addToCart);
    router.route("/").get(buyerMiddleware.buyer, cartController.getCartBuyer);
    router.route("/update/:id").put(buyerMiddleware.buyer, cartController.editCart);
    router.route("/delete/:id").delete(buyerMiddleware.buyer, cartController.deleteFromCart)
    app.use("/cart", router)
}