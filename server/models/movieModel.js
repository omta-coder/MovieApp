const mongoose = require("mongoose");

//movie schema
const movieSchema = new mongoose.Schema({
    userid:{
        type:String,
        require:true
    },
    moviename:{
        type:String,
        require:true
    },
    image:{
        type:String,
        require:true
    },
    publishyear:{
        type:String,
        require:true
    }
},{timestamps: true}); //this will add createdAt and updatedAt as fields in our db  

const movieDB= mongoose.model('Movie', movieSchema);  //We export the model so that other modules can use it

module.exports = movieDB;