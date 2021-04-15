const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let schemaCheckout = new Schema({
    orderNumber : {
        type : String, 
        trim : true 
    },
    status : {
        type : String, 
        trim : true,
        default : "pending"
    },
    idBuyer : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Buyers"
    },
    product : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cart"
    }],
    stripe : {
        type : Boolean
    },
    cod : {
        type : Boolean
    },
    createdAt : {
        type : Date, 
        default: Date.now
    }  
})

let checkoutEx = mongoose.model("Checkout", schemaCheckout, "checkout");

module.exports = checkoutEx;