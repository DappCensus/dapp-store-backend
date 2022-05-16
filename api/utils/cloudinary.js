const cloudinary = require("cloudinary").v2;
require("dotenv").config()
cloudinary.config({
  cloud_name: 'drq8otsni',
  api_key: '978319783343861',
  api_secret: 'LYK_FhNayXiLlIA1yXzu-P0hLgI',
}); 
module.exports = cloudinary;