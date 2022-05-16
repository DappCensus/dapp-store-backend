const mongoose = require("mongoose");



const generalSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    appName:{type:String, required: true},
    appMotor:{type:String, required: true},
    weeklyQoute: {type:String, required:true},







});



module.exports = mongoose.model("General", generalSchema);