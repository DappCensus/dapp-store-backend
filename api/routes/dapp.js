const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const upload = require("../utils/multer");
const dappImageModel  = require("../models/dappImageModel");
const cloudinary = require("../utils/cloudinary");
const Dapp = require("../models/dapp");



router.get("/", (req, res, next)=>{
    Dapp.find()
    .exec()
    .then(docs =>{
        res.status(200).json({
            count: docs.length,
            dapp: docs.map(doc =>{
                return {
                    _id: doc._id,
                    name:doc.name,
                    company:doc.company,
                    ageRating:doc.ageRating,
                    starRating:doc.starRating,
                    newUpdates:doc.newUpdates,
                    description:doc.description,
                    version:doc.version,
                     dappImageUrl: doc.dappImageUrl,
                     dappImageCloudId:doc.dappImageCloudId,
                     createdAt :doc.createdAt,
                   
                    request:{
                        type:"GET",
                        url: "./dapp"+doc._id   
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






router.post("/", upload.single('dappImage') , function (request, response){

    cloudinary.uploader.upload(request.file.path)
    .then(function(x)
    {
   
   const cloud = new dappImageModel({
    name: request.body.name,
    avatar: x.secure_url,
    cloudinary_id: x.public_id,
  });
  cloud.save()
  .then(function(cloudResponse)
  {
         if(cloudResponse)
          
         {
        
            const dapp = new Dapp({
                _id: new mongoose.Types.ObjectId(),
               name: request.body.name,
               company: request.body.company,
               ageRating: request.body.ageRating,
               starRating: request.body.starRating,
               newUpdate: request.body.newUpdate,
               description:request.body.description,
               version:request.body.version,
                dappImageUrl: cloudResponse.avatar,
                dappImageCloudId: cloudResponse.cloudinary_id,
            });
            dapp.save().then(result =>{
                console.log(result);
                response.status(201).json({
                    status: "200",
                    message: "Uploaded dapp successfully", 
                    createdDaap: {
                       
                        data:{
                        _id: result._id,
                       name:result.name,
                       company:result.company,
                       ageRating:result.ageRating,
                       starRating:result.starRating,
                       newUpdate:result.newUpdate,
                       description:result.description,
                       version:result.version,
                        dappImageUrl: result.dappImageUrl,
                        dappImageCloudId:result.dappImageCloudId,
                        createdAt :result.createdAt,
                        request:{
                            type:"POST",
                            url: "./dapp"+result._id   
                        }
                        },

                    }
                });
               

               }).catch(function (error) {
          
                return response.status(500).json({ error:'check err1' });
              });
         
         }

         else {
            response.status(501).json({error : error.message});
            console.log({error : error.message});
  
              }
  
      })
      .catch(function (error) {
            
          return response.status(502).json({ error: error.message });
        

      });

    }) .catch((error) => {
        response.status(503).send({
          message: "failed",
          error,
        }); 
      });   
   
    })
         
      
    router.delete("/:dappId", (req, res, next)=>{
        Dapp.remove({_id : req.params.dappId})
        .exec()
        .then(result =>{
            res.status(200).json({
                message: "Dapp deleted"
            });
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
    
    });

     



    module.exports = router;