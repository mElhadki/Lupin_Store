module.exports = app => {
    const router = require("express").Router();
    let sellerMiddleware = require("../middlewares/seller.middleware");
    let adminMiddleware = require("../middlewares/admin.middlewares");
    let productController = require("../controllers/products.controllers");
    router.route("/").get(productController.getAllProducts);
    router.route("/add").post(sellerMiddleware.seller, productController.addProduct);
    router.route("/one/:id").get(productController.getOneProduct);
    router.route("/update/:id").put(sellerMiddleware.seller, productController.editProduct);
    router.route("/invalid").get(productController.getAllInvalidProducts);
    router.route("/approve/:id").get(adminMiddleware.admin, productController.validProduct);
    app.use("/products", router);
}