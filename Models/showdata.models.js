const mongoose = require("mongoose");



const movieSchema = mongoose.Schema({
    title:String,
        poster:String,
        storyline:String,
        released:Date,
        runtime:Number,
        budget:String,
        popularity:Number,
        language:String,
        vote:Number,
        genres: [String],
        reviews:String,
        episodes:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Episodes"
        }],
        createdAt: { type: Date, default: Date.now }
})


module.exports = mongoose.model("Movie", movieSchema);