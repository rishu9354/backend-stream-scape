const express = require("express");
const router = express.Router();
const {signUp, logIn, uploadShowData} = require("../Controller/authController")
// const  = require("../Controller/authController");
const upload = require("../config/multer.config");

router.get("/",(req,res)=>{
    res.send("auth route working..")
})

router.post("/login",logIn);
router.post("/signup",signUp)

router.post("/register",upload.single("poster"),uploadShowData)
module.exports = router;