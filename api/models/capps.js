const mongoose = require("mongoose");




const  cappSchema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true},
    company : {type: String,required: true},
    ageRating: {type:String, required:true},
    starRating: {type:String, required:true},
    newUpdate: {type:String},
    description: {type:String, required:true},
    version:{type:String, required:true},
    cappImageUrl :  {type :String ,required : true},
    cappImageCloudId : {type :String ,required : true},
    createdAt:   { type: Date, default: Date.now }


});






module.exports = mongoose.model("Capp", cappSchema);