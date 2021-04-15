let mongoose = require("mongoose");
const Schema = mongoose.Schema;

var schemaSeller = new Schema({
    fullname: {
        type: String,
        required: true,
        trim: true,
        minlenght: 4,
    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique: [true, 'That username is taken.'],
        minlenght: 4,
    },
    phone: {
        type: String,
        required: true,
        trim: true,
        unique: [true, 'That phone is taken.'],
        minlenght: 10,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: [true, 'That email is taken.'],
        minlenght: 10,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        select: false,
        minlenght: 4,
    },
    tempPassword: {
        type: String,
        required: true,
        trim: true,
        minlenght: 4,
    },
    pdfFisca: {
        type: String,
        required: true,
        trim: true,
    },
    firstLogin : {
        type:Boolean,
        default : true,
    },
    packChoose : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pack",
        required: true
    },
    valid: {
        type: Boolean,
        default: false
    },
    ban : {
        type : Boolean,
        default : false
    }
},
    {
        versionKey: false
    }
);

const SellerEx = mongoose.model("Seller", schemaSeller, "seller");
module.exports = SellerEx;