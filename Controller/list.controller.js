const showData = require("../Models/showdata.models");

const getShowData = async (req,res)=>{
    try {
        let {title} = req.params;

        if(!title){
            return res.status(400).json({message:"Movie title required!.."});
        }

        const show = await showData.findOne({title:title}).populate("episodes");
        if(!show){
            return res.status(400).json({message:"Movie not found!.."});

        }
        return res.status(200).json({
            success: true,
            data: show
        });
    } catch (error) {
        console.error("Error while fetching show data:", error);
        return res.status(500).json({
            message: "Server error"
        });
    }
}

module.exports = getShowData;