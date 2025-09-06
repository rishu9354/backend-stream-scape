const fs = require("fs");
const path = require("path");
const axios = require("axios");
const mime = require("mime-types");

require("dotenv").config();

const uploadOnBanny = async(directoryPath, file)=>{
    try {
        if(!file) return null; 
        const fileStream = fs.createReadStream(file.path);
        const fileExten = path.extname(file.originalname).slice(1);

        const uri = `https://sg.storage.bunnycdn.com/stream-scape-storage/${directoryPath}/${file.filename}`;
        const contentType = mime.lookup(fileExten) || "application/octet-stream";

        const response = await axios.put(uri,fileStream,{
            headers:{
                AccessKey:process.env.BANNY_API_KEY,
                "Content-Type":contentType
            }
        })
        fs.unlinkSync(file.path)
        return {
            success:true,
            url:`https://stream-scape-pull.b-cdn.net/${directoryPath}/${file.filename}`,
            public_id:file.filename,
            message:"File uploaded on banny"
        }
    } catch (error) {
        if(file?.path && fs.existsSync(file.path)){
            fs.unlinkSync(file.path)
        }

        console.error("Banny uploaded error",error.response?.data || error.message);
        return null
    }
}

module.exports = uploadOnBanny;