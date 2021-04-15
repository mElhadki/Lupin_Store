const Packs = require("../models/packs.models")

exports.addPack = (req, res) => {
    let namePack = req.body.namePack;
    let price = req.body.price;
    let limit = req.body.limit;
    let error = [];
    if (namePack === ""){
        error.push("the name pack is empty")
    }
    else if(namePack.length < 3){
        error.push("the name pack is too short")
    }
    if(price === ""){
        error.push("the price is empty");
    }
    else if(price.length < 1){
        error.push("the price is too short")
    }
    if(limit === ""){
        error.push("the limit is empty")
    }
    else if(limit.length < 1){
        error.push("the limit is too short");
    }
    if(error.length > 0){
        res.json({error : error})
    }
    else{
        let packPush = new Packs({
            namePack,
            price,
            limit
        })
        packPush.save().then((response) => res.json(response)).catch((err) => res.json(err))
    }
}

exports.editPack = (req, res) => {

}

exports.getAllPacks = (req, res) => {

}

exports.getOnePack = (req, res) => {

}

exports.deletePack = (req, res) => {

}