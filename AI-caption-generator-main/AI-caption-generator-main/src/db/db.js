const mongoose = require("mongoose");

function connectDB() {
    return mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Connected To DB")
    })

    .catch(err=>{
        console.log(err)
    })
}

module.exports = connectDB