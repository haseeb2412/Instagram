const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    followers:[{type:String,ref:"User"}],
    following:[{type:String,ref:"User"}]
})
module.exports = mongoose.model("User",UserSchema);