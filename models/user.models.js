const mongoose = require('mongoose');

const user = new mongoose.Schema({
    firstname : {type:String},
    lastname : {type:String},
    profilepic : {type:String},
    email :  {type:String , required:true },
    password: {type:String , required:true },
    isEmailVerified: {type:Boolean , default:false}
},
{ timestamps: true },

);
module.exports = mongoose.model("userModel",user)