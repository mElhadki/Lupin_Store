const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Buyers = new Schema(
    {
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

const BuyerEx = mongoose.model("Buyers", Buyers, "buyer");
module.exports = BuyerEx;