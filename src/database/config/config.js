const { 
  MONGO_URI
}
= require('../../credentials');

const mongoose = require("mongoose");

mongoose.connect(MONGO_URI)
.then(() => console.log("Connected to MongoDB Atlas"))
.catch(err => console.error("Error to connect MongoDB:", err));
