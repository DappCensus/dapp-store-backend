const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const upload = require("../utils/multer");
const produceImageModel = require("../models/produceImageModel");
const cloudinary = require("../utils/cloudinary");
const Market = require("../models/market");






router.get("/", (req, res, next)=>{
    Market.find()
    .exec()
    .then(docs =>{
        const response = {
            count: docs.length,
            markets: docs.map(doc =>{
                return{
                    _id: doc._id,
                    userId: doc.userId,
                    name:doc.name,
                    quantity:doc.quantity,
                    location:doc.location,
                    price:doc.price,
                    description:doc.description,
                    produceImageUrl:doc.produceImageUrl,
                    produceImageCloudId:doc.produceImageCloudId, 
                    createdAt:doc.createdAt

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



router.post("/get", (req, res, next)=>{
    Market.find({user: req.body.userId})
    .exec()
    .then(docs =>{
        const response = {
            count: docs.length,
            markets: docs.map(doc =>{
                return{
                    _id: doc._id,
                    userId: doc.userId,
                    name:doc.name,
                    quantity:doc.quantity,
                    location:doc.location,
                    price:doc.price,
                    description:doc.description,
                    produceImageUrl:doc.produceImageUrl,
                    produceImageCloudId:doc.produceImageCloudId, 
                    createdAt:doc.createdAt
                
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















router.post("/", upload.single('produceImage') , function (request, response){

    cloudinary.uploader.upload(request.file.path)
    .then(function(x)
    {
        // Create new userCloud
    
   const cloud = new produceImageModel({
    name: request.body.name,
    avatar: x.secure_url,
    cloudinary_id: x.public_id,
  });
  // Save Image to cloud
  cloud.save()
  .then(function(cloudResponse)
  {
      // if image is saved,  then go check  the rsponse and get its url
       
         // response.status(200).json(cloudResponse);  
         if(cloudResponse)
          
         {
        
            const market = new Market({
                _id: new mongoose.Types.ObjectId(),
                userId:request.body.userId,
                name: request.body.name,
                quantity: request.body.quantity,
                location: request.body.location,
                price:request.body.price,
                 description:request.body.description,
                produceImageUrl: cloudResponse.avatar,
                produceImageCloudId: cloudResponse.cloudinary_id,
            });
            market.save().then(result =>{
                console.log(result);
                response.status(201).json({
                    message: "Listing produce successful", 
                    createProduce: result
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




    router.delete("/:marketId", (req, res, next) =>{
        const _id = req.params.marketId;  
      Market.remove({_id}).exec().then(result =>{
          res.status(200).json({
              message:"Produce deleted successfully"
          });
      }).catch(err=>{
          console.log(err);
          res.status(500).json({
              error: err
          });
  
      });
  
  
  });
         
      
    

     




module.exports = router;