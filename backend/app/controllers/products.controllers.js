const Products = require('../models/products.models');
const multer = require("multer");
const util = require("util");
const maxSize = 100 * 1024 * 1024;

exports.addProduct = async (req, res) => {
    let storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, __basedir + "/app/img");
        },
        filename: (req, file, cb) => {
            console.log(file.originalname);
            cb(null, file.originalname);
        },
    });

    let uploadFile = multer({
        storage: storage,
        limits: {
            fileSize: maxSize
        },
    }).single("file");

    let uploadFileMiddleware = util.promisify(uploadFile);

    try {
        await uploadFileMiddleware(req, res);
        if (req.file == undefined) {
            return res.status(400).send({ message: "Please upload a file!" });
        }

    } catch (err) {
        if (err.code == "LIMIT_FILE_SIZE") {
            return res.status(500).send({
                message: "File size cannot be larger than 2MB!",
            });
        }

        res.status(500).send({
            message: `Could not upload the file: ${req.file.originalname}. ${err}`,
        });
    }

    let productName = req.body.productName;
    let categoryId = req.body.categoryId;
    let sellerId = req.idSeller;
    let description = req.body.description;
    let price = req.body.price;
    let qte = req.body.qte;
    let image = req.file.originalname;
    let error = [];
    if (productName === "") {
        error.push("product name is empty");
    }
    else if (productName.length < 4) {
        error.push("product name is too short");
    }
    if (categoryId === "") {
        error.push("category name is empty");
    }
    else if (categoryId.length < 10) {
        error.push("category name is too short");
    }
    if (description === "") {
        error.push("description is empty");
    }
    else if (description.length < 10) {
        error.push("description is too short");
    }
    if (price === "") {
        error.push("price is empty");
    }
    else if (price.length < 1) {
        error.push("price is too short");
    }
    if (qte === "") {
        error.push("qte is empty");
    }
    else if (qte.length < 1) {
        error.push("qte is too short");
    }
    if (error.length > 0) {
        res.json({ error: error })
    }
    else {
        let productPush = new Products({
            productName,
            categoryId,
            sellerId,
            image,
            description,
            price,
            qte
        })
        productPush.save().then((response) => res.json(response)).catch((err) => res.json(err))
    }
}

exports.editProduct = async (req, res) => {
    let storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, __basedir + "/app/img");
        },
        filename: (req, file, cb) => {
            console.log(file.originalname);
            cb(null, file.originalname);
        },
    });

    let uploadFile = multer({
        storage: storage,
        limits: {
            fileSize: maxSize
        },
    }).single("file");

    let uploadFileMiddleware = util.promisify(uploadFile);

    try {
        await uploadFileMiddleware(req, res);
        if (req.file == undefined) {
            return res.status(400).send({ message: "Please upload a file!" });
        }

    } catch (err) {
        if (err.code == "LIMIT_FILE_SIZE") {
            return res.status(500).send({
                message: "File size cannot be larger than 2MB!",
            });
        }

        res.status(500).send({
            message: `Could not upload the file: ${req.file.originalname}. ${err}`,
        });
    }

    let productName = req.body.productName;
    let categoryId = req.body.categoryId;
    let sellerId = req.idSeller;
    let description = req.body.description;
    let price = req.body.price;
    let qte = req.body.qte;
    let error = [];
    if (productName !== undefined) {
        if (productName === "") {
            error.push("product name is empty");
        }
        else if (productName.length < 4) {
            error.push("product name is too short");
        }
    }
    if (categoryId !== undefined) {
        if (categoryId === "") {
            error.push("category name is empty");
        }
        else if (categoryId.length < 10) {
            error.push("category name is too short");
        }
    }
    if (description !== undefined) {
        if (description === "") {
            error.push("description is empty");
        }
        else if (description.length < 10) {
            error.push("description is too short");
        }
    }
    if (price !== undefined) {
        if (price === "") {
            error.push("price is empty");
        }
        else if (price.length < 1) {
            error.push("price is too short");
        }
    }
    if (qte !== undefined) {
        if (qte === "") {
            error.push("qte is empty");
        }
        else if (qte.length < 1) {
            error.push("qte is too short");
        }
    }
    if (error.length > 0) {
        res.json({ error: error })
    }
    else {
        let update = {
            productName: productName,
            categoryId: categoryId,
            sellerId: sellerId,
            description: description,
            price: price,
            qte: qte
        }
        if (req.file !== undefined) {
            let updateIt = Object.assign(update, { image: req.file.originalname })
        }
        await Products.findOne({ _id: req.params.id }).then(async (data) => {
            if (data == null) {
                error.push("product not found");
                res.json({ error: error })
            }
            else if (data.idSeller !== req.idSeller) {
                error.push("not authorized !")
                res.json({ error: error })
            }
            else {
                await Products.updateOne({ _id: req.params.id }, { $set: update }).then(() => res.json("updated !")).catch((err) => res.json(err))
            }
        })


    }

}

exports.validProduct = async (req, res) => {
    await Products.updateOne({ _id: req.params.id }, { $set: { valid: true } }).then(() => {
        res.json({ notif: "product approved !" });
    })
}
exports.deleteProduct = (req, res) => {

}
exports.getAllProducts = async (req, res) => {
    await Products.find({ valid: true }).populate("categoryId").populate("sellerId").then((response) => {
      
            res.json(response)
        
    })
}
exports.getAllInvalidProducts = async (req, res) => {
    await Products.find({ valid: false }).populate("categoryId").populate("sellerId").then((response) => {
        if (typeof response === 'object') {
            res.json({ error: "no products founds !" })
        }
        else {
            res.json(response)
        }
    }).catch((err) => res.json(err))
}
exports.getOneProduct = async (req, res) => {
    await Products.findOne({ _id: req.params.id, valid: true }).populate("categoryId").populate("sellerId").then((response) => {
        if (response == null) {
            res.json({ error: "product found!" })
        }
        else {
            res.json(response)
        }
    })
}