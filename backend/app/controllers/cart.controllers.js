let Cart = require("../models/cart.models");
let Product = require("../models/products.models");

exports.addToCart = async (req, res) => {
    let idProduct = req.body.idProduct;
    let idBuyer = req.idBuyer;
    let qte = req.body.qte;
    let error = [];



    await Product.findOne({ _id: idProduct, valid: true }).then(async (data) => {
        if (data == null) {
            error.push("product not found")

        }
        if (qte === "") {
            error.push("quantity is empty !")
        }
        else if (qte.length < 1) {
            error.push("quantity is too short !")
        }
        else {
            if (data.qte === 0) {
                error.push("product out stock !")
            }
            else if (data.qte < qte) {
                error.push("choose a quantity min than or " + data.qte + "!")
            }
        }
        if (error.length > 0) {
            res.json({ error: error })
        }
        else {
           await Cart.findOne({idProduct : idProduct, idBuyer:idBuyer}).then(async (response) => {
                if(response !== null){
                    Cart.updateOne({_id : response._id}, {$inc : { qte : qte }}).then(() => res.json({notif : "product qte updated !"}));
                }
                else{
                    let cartPush = new Cart({
                        idProduct: idProduct,
                        idBuyer: idBuyer,
                        qte: qte
                    })
                     cartPush.save().then(() => res.json({ notif: "product added to cart !" })).catch((err) => res.json(err))
                }
            })
              
        }
    }).catch((err) => res.json(err))

}
exports.deleteFromCart = (req, res) => {
    Cart.findById(req.params.id).then((success) => {
        if (data == null) {
            res.json({ error: "item not found !" })
        }
        else {
            Cart.deleteOne({ _id: req.params.id }).then((data) => {
                res.json({ notification: "item deleted !" })
            })
        }
    }).catch((err) => res.json(err))
};

exports.editCart = (req, res) => {

}

exports.getCartBuyer = async (req, res) => {
   await Cart.find({ idBuyer: req.idBuyer }).populate("idProduct").populate("idBuyer").then((data) => {
        if (data == null) {
            res.json({ error: 'cart is empty !' })
        }
        else {
            res.json(data)
        }
    })
}

