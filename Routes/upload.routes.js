const express = require("express");
const router = express.Router();

const upload = require("../config/multer.config");
const uplaodFile = require("../Controller/upload.controller");
const {getShowData, getAllData} = require("../Controller/list.controller");

// single file uploaded router
router.post("/upload", upload.single("video"), uplaodFile);
router.get("/",getAllData);
router.get("/movie/:title",getShowData);
module.exports = router;