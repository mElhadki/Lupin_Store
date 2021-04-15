module.exports = app => {
    const router = require("express").Router();
    let adminMiddleware = require("../middlewares/admin.middlewares");
    let categoryControoler = require("../controllers/category.controllers");
    router.route("/").get(categoryControoler.getAllCat);
    router.route("/:id").get(categoryControoler.getOneCat);
    router.route("/update/:id").get(adminMiddleware.admin, categoryControoler.editCat);
    router.route("/delete/:id").get(adminMiddleware.admin, categoryControoler.deleteCat);
    app.use("/category", router);
}