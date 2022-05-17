
const mongoose = require("mongoose");



const marketSchema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
   
    createdAt:{ type: Date, default: Date.now }
});




module.exports = mongoose.model("Market", marketSchema);