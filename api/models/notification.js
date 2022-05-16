const mongoose = require("mongoose");



const notificationSchema = mongoose.Schema({
_id: mongoose.Schema.Types.ObjectId,
userId:{type:String, required:true},
heading: {type:String, required: true},
message: {type: String, required:true},
date: {type: String, default:Date.now}
});


module.exports = mongoose.model("Notification", notificationSchema);