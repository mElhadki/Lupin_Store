const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Admin = new Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
            minlenght: 4,
        },
        phone: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            dropDups: true,
            minlenght: 10,
        },
        password: {
            type: String,
            required: true,
            trim: true,
            select: false,
            minlenght: 4,
        },
        superadmin: {
            type: Boolean,
            default: false
        }
    },
    {
        versionKey: false
    }
);

const AdminEx = mongoose.model("Admin", Admin, "admin");
module.exports = AdminEx;