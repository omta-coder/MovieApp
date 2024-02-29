const mongoose = require("mongoose");

mongoose
.connect(process.env.MONGODB_URL)
.then(()=>console.log("DB connected"))
.catch((error)=>console.log(error));