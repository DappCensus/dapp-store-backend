const mongoose = require("mongoose");

const feedbackSchema = mongoose.Schema({

_id: mongoose.Schema.Types.ObjectId,

senderMail: {type:String, required: true},
message: {type: String, required:true},
date: {type: String, default:Date.now}


});


module.exports = mongoose.model("Feedback", feedbackSchema);