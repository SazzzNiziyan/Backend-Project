const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    fullname:{
        firstname:{
            type:String,
            required:true
        },
        lastname:{
            type:String,
        }
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type : String,
        enum:["user" , "creator"],
        default:"user"
    }
});

const User = mongoose.model("user", userSchema);

module.exports = User;