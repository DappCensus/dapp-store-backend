
const mongoose = require("mongoose");



const marketSchema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    userId:{type:String, required:true},
    name: {type: String, required:true},
    quantity: {type: String, required:true},
    location: {type: String, required:true},
    price: {type: String, required:true},
    description: {type: String, required:true},
    produceImageUrl: {type: String, required:true},
    produceImageCloudId: {type:String, required:true},
    createdAt:{ type: Date, default: Date.now }
});




module.exports = mongoose.model("Market", marketSchema);