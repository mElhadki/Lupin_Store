let mongoose = require("mongoose");
const Schema = mongoose.Schema;

var schemaCategory = new Schema({
    nameCat: {
        type: String,
        required: true,
        trim: true,
        minlenght: 4,
    },
    addBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin",
        required : true
    },
    editedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin"
    }
},
    {
        versionKey: false
    }
);

const CatEx = mongoose.model("Category", schemaCategory, "category");
module.exports = CatEx;