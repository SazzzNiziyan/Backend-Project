const mongoose = require("mongoose")

function connectToDB(){
    mongoose.connect("mongodb url")
    .then(()=>{
        console.log("mongoose is start")
    })
}

module.exports = connectToDB