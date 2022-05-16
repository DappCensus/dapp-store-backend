const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");



const Feedback = require("../models/feedback");



router.get("/", (req, res, next)=>{
    Feedback.find()
    .exec()
    .then(docs =>{
        res.status(200).json({
            count: docs.length,
            feedback: docs.map(doc =>{
                return {
                    _id: doc._id,
                    senderMail: doc.senderMail,
                    message: doc.message,
                    date: doc.date,
                   
                    request:{
                        type:"GET",
                        url: "./feedback"+doc._id   
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



 router.post("/", (req, res, next)=>{
  
    const feedback = new Feedback({
    _id: new mongoose.Types.ObjectId(),
    senderMail: req.body.senderMail,
    message: req.body.message,
    //date: req.body.date
});
feedback.save().then(result =>{
    console.log(result);
    res.status(201).json({
        message: "Created feedback successfully", 
        createFeedback: {
            senderMail: result.senderMail,
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


    router.delete("/:feedbackId", (req, res, next) =>{
        const _id = req.params.feedbackId;  
      Feedback.remove({_id}).exec().then(result =>{
          res.status(200).json(result);
      }).catch(err=>{
          console.log(err);
          res.status(500).json({
              error: err
          });
  
      });
  
  
  });


  module.exports = router;