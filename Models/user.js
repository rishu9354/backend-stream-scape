const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    fullname:String,
    email:{type:String, unique:true},
    password:String
});
module.exports = mongoose.model("user",userSchema);