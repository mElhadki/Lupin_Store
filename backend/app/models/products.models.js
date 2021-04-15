let mongoose = require("mongoose");
const Schema = mongoose.Schema;

var schemaSeller = new Schema({
    productName: {
        type: String,
        required: true,
        trim: true,
        minlenght: 4,
    },
    categoryId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },  
    sellerId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Seller",
        required: true
    },
    image: {
        type: String,
        required: true,
        trim: true,
        minlenght: 4,
    },
    description: {
        type: String,
        required: true,
        trim: true,
        minlenght: 10,
    },
    price: {
        type: Number,
        required: true,
        trim: true,
        minlenght: 1,
    },
    qte : {
        type: Number,
        required: true,
        trim: true,
        minlenght: 1,
    },
    valid: {
        type: Boolean,
        default: false
    },
},
    {
        versionKey: false
    }
);

const SellerEx = mongoose.model("Products", schemaSeller, "product");
module.exports = SellerEx;