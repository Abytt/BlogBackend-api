const cors= require("cors")
const express= require("express")
const mongoose= require("mongoose")
const Schema=mongoose.Schema(
    {
        "name":{type:String,required:true},
        "Email":{type:String,required:true},
        "password":{type:String,required:true}
    }
)
const blogmodel =mongoose.model("user",Schema);
module.exports={blogmodel}
