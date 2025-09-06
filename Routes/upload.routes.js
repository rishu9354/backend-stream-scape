const express = require("express");
const router = express.Router();

const upload = require("../config/multer.config");
const uplaodFile = require("../Controller/upload.controller");
const getShowData = require("../Controller/list.controller");
// single file uploaded router
router.post("/upload", upload.single("video"), uplaodFile);
router.get("/movie/:title",getShowData);
module.exports = router;