const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

router.get("/", (req, res, next)=>{
    
        res.status(200).json({
                    appName: 'Farmbox',
                    appMotor: 'your pocket farm',
                    weeklyQoute: 'Agriculture is life',
        });
    });
 module.exports = router;