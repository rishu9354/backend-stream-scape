const multer = require("multer");
const crypto = require("crypto");
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./public/temp')
    },
    filename:function(req,file,cb){
        crypto.randomBytes(12,function(err,bytes){
        if(err) return cb(err,null);
        const fn = bytes.toString("hex")+path.extname(file.originalname);
        cb(null,fn)
    })
    }
})



const upload = multer({
    storage,
    limits: { fileSize: 1000 * 1024 * 1024 },
});

module.exports = upload;