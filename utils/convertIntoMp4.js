const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
ffmpeg.setFfmpegPath(ffmpegPath);
const path = require("path");
const fs = require("fs");

async function convertIntoMp4(inputPath, originalName){
    return new Promise((resolve,reject)=>{
        // const outputFileName = path.basename(originalName,path.extname(originalName)) + ".mp4";
        const outputPath = path.join(__dirname, "../public/converted"); //yeh public/uploads/ me save karega

        if(!fs.existsSync(outputPath)){
            fs.mkdirSync(outputPath,{recursive:true})
        }

        const outputFile = path.join(outputPath,path.basename(originalName,path.extname(originalName))) + ".mp4";

        // convert to mp4
        ffmpeg(inputPath)
        .output(outputFile) //
        .on("end",()=>{
            console.log("converted successfully.",outputFile);
            // delete the base file from folder
            if(fs.existsSync(inputPath)){
                fs.unlinkSync(inputPath);
            }
            resolve(outputFile);

        })
        .on("error",(err)=>{
            console.error("converted error: ",err);
            reject(err);
        })
        // .save(outputPath);
        .run();
    })
}

module.exports = convertIntoMp4;