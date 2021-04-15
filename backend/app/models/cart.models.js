let mongoose = require("mongoose");
const Schema = mongoose.Schema;

var schemaCart = new Schema({
    idProduct : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Products",
        required : true
    },
    idBuyer : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Buyers",
        required : true
    },
    qte : {
        type : Number,
        required: true
    }
}, 
{
    versionKey : false
});

const cartEx = mongoose.model("Cart", schemaCart, "cart");
module.exports = cartEx;