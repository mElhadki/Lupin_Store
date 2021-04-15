const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const Packs = new Schema({
    namePack: {
        type: String,
        required: true,
        trim: true,
        minlenght: 4,
    },
    price: {
        type: Number,
        required: true,
    },
    limit: {
        type: Number,
        required: true
    }
},
    {
        versionKey: false
    })


let packEx = mongoose.model("Pack", Packs, "pack")
module.exports = packEx;
