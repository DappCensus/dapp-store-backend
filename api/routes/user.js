const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bycrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");



router.post("/login", (req, res, next) =>{
    User.find({email: req.body.email})
    .exec()
    .then(user =>{
        if(user.length<1){
            return res.status(401).json({
                message: "Auth failed"
            });
        }
        bycrypt.compare(req.body.password, user[0].password, (err, result)=>{
            if (err){
                return res.status(401).json({
                    message: "Auth failed"
                });
            }
            if(result){
             const token  = jwt.sign({
                    email:user[0].email,
                    userId: user[0]._id
                },
                "secretjwts", 
                {
                    expiresIn: "1h"
                },

                )
                return res.status(200).json({
                    message: "Login Success" ,
                    status: 200,
                    token: token,
                    basic:{
                        id:user[0]._id,
                        firstname:user[0].firstname,
                        lastname: user[0].lastname,
                        email:user[0].email,
                        date:user[0].created
                    },  
                 
                });
            }
            res.status(401).json({
               message: "Auth failed" 
            });
        });
         
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});



router.get("/", (req, res, next)=>{
    User.find()
    
    .exec()
    .then(docs =>{
        const response = {
            count: docs.length,
            users: docs
                    
                
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







router.post("/signup", (req, res, next)=>{
    User.find({email: req.body.email})
    .exec()
    .then(user => {
        if(user.length >= 1){
            return res.status(409).json({
                message: "Mail already used"
            });
        }else{

        

            bycrypt.hash(req.body.password, 10, function(err, hash){
                if(err){
                    console.log(err);
                    return res.status(500).json({
                        
                        error:err
                    });
                }else{
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),               
                        email: req.body.email,
                        password: hash,
                        fullname: req.body.fullname,
                        phone: req.body.phone,
                        created: new Date().toISOString()
                    });
                    user.save().then(result =>{
                        console.log(result);
                        res.status(201).json({
                            message: "User Created Successfully",
                            status: 200
                        });


                       

                    }).catch(err => {
                        console.log(err);
                        return res.status(500).json({
                            error:err
                        });
        
                    });
                }
  

            });
            
        }
    
    });
    
});



    
    router.delete("/:userId", (req, res, next)=>{
        User.remove({_id : req.params.userId})
        .exec()
        .then(result =>{
            res.status(200).json({
                message: "User deleted"
            });
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
    
    });
    


module.exports = router;