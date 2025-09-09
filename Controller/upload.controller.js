const uploadOnBanny = require("../utils/banny");
const showModel = require("../Models/showdata.models")
const episodesModel = require("../Models/episodes.models")
const path = require("path")
const convertIntoMp4 = require("../utils/convertIntoMp4");

const uploadFile = async (req, res) => {
    try {
        let { title, episodeNumber, duration, movieId } = req.body;
        const localFilePath = req.file;

        if (!localFilePath) {
            return res.status(400).json({ message: "No File upload" })
        }

        let finalFilePath = localFilePath.path;
        let finalFileName = localFilePath.filename;

        // check video format
        const ext = path.extname(localFilePath.originalname).toLowerCase();
        if (ext !== ".mp4") {
            console.log("converting to mp4..");
            finalFilePath = await convertIntoMp4(localFilePath.path,localFilePath.originalname)
        }
        // upload to banny
        const result = await uploadOnBanny("episodes",finalFilePath);

        if (!result || !result.url) {
            return res.status(500).json({ message: "File upload failed error on upload.controller" });
        }
        const episode = await episodesModel.create({
            title,
            episodeNumber,
            video_url: result.url,
            duration,
            movie: movieId
        })

        await showModel.findByIdAndUpdate(movieId, {
            $push: { episodes: episode._id }
        })
        return res.status(200).json({
            message: "File uploaded successfully on Banny CDN",
            url: result.url,
            episode
        })
    } catch (error) {
        console.error("Uplaod controller mein error: ", error);
        return res.status(500).json({
            message: "Server error"
        })
    }
};

// const uploadShowData = async (req,res) =>{

// }

module.exports = uploadFile;
