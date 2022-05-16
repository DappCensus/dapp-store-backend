const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");



const Notification = require("../models/notification");



router.get("/", (req, res, next)=>{
    Notification.find()
    .exec()
    .then(docs =>{
        res.status(200).json({
            count: docs.length,
            notification: docs.map(doc =>{
                return {
                    _id: doc._id,
                    userId:doc.userId,
                    heading: doc.heading,
                    message: doc.message,
                    date: doc.date,
                   
                    request:{
                        type:"GET",
                        url: "./notification"+doc._id   
                    }
                }
            }),
            
 
        });
    })
    .catch(err =>{
        res.status(500).json({
            error:err
        });
    });
 });


 router.post("/get", (req, res, next)=>{
    Notification.find({user: req.body.userId})
    .exec()
    .then(docs =>{
        const response = {
            count: docs.length,
            notifications: docs.map(doc =>{
                return{
                    _id: doc._id,
                    userId: doc.userId,
                    heading: doc.heading,
                    message: doc.message,
                    date: doc.date,
                   
                
                }
            })
        }
        res.status(200).json(response);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});





router.post("/", (req, res, next)=>{
  
    const notification = new Notification({
    _id: new mongoose.Types.ObjectId(),
    userId: req.body.userId,
    heading: req.body.heading,
    message: req.body.message,
 
});
notification.save().then(result =>{
    console.log(result);
    res.status(201).json({
        message: "Created notification successfully", 
        createNotification: {
            userId: result.userId,
            heading: result.heading,
            message: result.message,
            date: result.date,
            _id: result._id,
            request:{
                type: "POST",
                url:"https://localhost:3000/feedback"+res._id
            }
        }
    });
}).catch(err =>
    {
        console.log(err);
        res.status(500).json({
            error:err
        });

    });
        
    });





 router.delete("/:notificationId", (req, res, next) =>{
    const _id = req.params.notificationId;  
  Notification.remove({_id}).exec().then(result =>{
      res.status(200).json(result);
  }).catch(err=>{
      console.log(err);
      res.status(500).json({
          error: err
      });

  });


});


module.exports = router;