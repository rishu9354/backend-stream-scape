const mongoose = require("mongoose")

const episodesSchema = mongoose.Schema({
    title:String,
    episodeNumber:Number,
    video_url:String, // cloudinary ka url save hoga 
    duration:Number,
    movie:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Movie" //movies se link
    },
    createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model("Episodes",episodesSchema);