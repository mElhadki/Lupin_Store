const Checkout = require("../models/checkout.models");
var uniqid = require('uniqid');
const Cart = require("../models/cart.models")
exports.createOrder = async (req, res) => {
    let orderNumber = uniqid("lupin-");
    let idBuyer = req.idBuyer;
    let product = [];
    let cod = req.body.cod;
    let stripe = req.body.stripe;
    await Cart.find({ idBuyer : req.idBuyer }).then((data) => {
        product.push(data[0]._id);
        console.log(data);
        let checkoutPush = new Checkout({
            orderNumber,
            idBuyer,
            product,
            cod,
            stripe
        })
        checkoutPush.save().then((data) => res.json(data))
    });

}

exports.approveOrder = (req, res) => {

}

exports.getAllOrders = (req, res) => {
    Checkout.find().populate("idBuyer").populate({
    path : "product",
    populate : {
        path : "idProduct",
        model : "Products"
     }
    }).then((data) => {
        res.json(data)
    })
}

