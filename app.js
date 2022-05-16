const express = require ("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require('cors');
const mongooose = require("mongoose");
const compression = require("compression");



const userRoutes = require("./api/routes/user");
const dappRoutes = require("./api/routes/dapp");
const feedbackRoutes = require("./api/routes/feedback");
const notificationRoutes = require("./api/routes/notification");
const generalRoutes = require("./api/routes/general");


const dotenv = require("dotenv");
dotenv.config(); 




mongooose.connect(
  // "mongodb+srv://farmbox:Oluwafunmi99@farmbox1.skevx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  "mongodb+srv://hstore:Hstore1230!@dappcluster.rkkyl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
 )

 mongooose.Promise = global.Promise

app.use(morgan("dev"));
app.use(cors());
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(compression());
app.set('view engine', 'ejs');


app.use("/user", userRoutes);
app.use("/dapps", dappRoutes);
app.use("/feedback", feedbackRoutes);
app.use("/notification", notificationRoutes)
app.use("/general", generalRoutes)


app.use('*',function(request,response)
{
    response.status(200).json({message:"API is working , but routes not defined"});
});



module.exports = app; 