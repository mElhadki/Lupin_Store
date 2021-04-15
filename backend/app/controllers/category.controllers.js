let Category = require("../models/category.models");

exports.addCat = (req, res) => {
    let nameCat = req.body.nameCat;
    let addBy = req.idAdmin;
    var error = [];
    if (nameCat === "") {
        error.push("name category is empty !")
    }
    else if (nameCat.length < 4) {
        error.push("name category is too short !")
    }
    if (error.length > 0) {
        res.json({ error: error })
    }
    else {
        var catPush = new Category({
            nameCat,
            addBy
        })
        catPush.save().then((response) => res.json(response))
    }

}
exports.editCat = (req, res) => {
    let nameCat = req.body.nameCat;
    let editedBy = req.idAdmin;
    var error = [];
    if (nameCat === "") {
        error.push("name category is empty !")
    }
    else if (nameCat.length < 4) {
        error.push("name category is too short !")
    }
    if (error.length > 0) {
        res.json({ error: error })
    }
    else {
        Category.updateOne({ _id: req.params.id }, { nameCat: nameCat, editedBy: editedBy })
            .then(() => res.json("category edited !"))
            .catch((err) => res.json(err))
    }

}
exports.getAllCat = async (req, res) => {
  await  Category.find().populate("addBy").then((response) => res.json(response))
}
exports.getOneCat = async (req, res) => {
   await Category.findOne({ _id: req.params.id }).populate('addBy').then((response) => res.json(response))
}
exports.deleteCat = async (req, res) => {
   await Category.deleteOne({ _id: req.params.id }).then(() => res.json("category deleted !")).catch((err) => res.json(err))
}