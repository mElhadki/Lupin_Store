module.exports = app => {
    const router = require("express").Router();
    const adminMiddleware = require('../middlewares/admin.middlewares');
    const packController = require("../controllers/packs.controllers");
    router.route("/add").post(adminMiddleware.admin, packController.addPack)
    app.use("/packs", router)
}