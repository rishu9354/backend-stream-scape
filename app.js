const express = require("express");
const app = express();

const cors = require("cors")
const cookieParser = require("cookie-parser");
const path = require("path");
// environment variable
require("dotenv").config();

const db = require("./config/mongoConfig");
const authRouter = require("./Routes/index")
const uploadRoutes = require("./Routes/upload.routes");
const showModel = require("./Models/showdata.models")

const allowedOrigins =[
    process.env.FRONTEND_URL,
    "http://localhost:3000"
]
// cors setup
app.use(cors({
    origin: allowedOrigins, //frontend url
    credentials:true //dor cookies use only
}));

// app.set("view engine","ejs");

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')))

app.use("/auth",authRouter);
app.use("/video",uploadRoutes);

app.get("/",(req,res)=>{
    res.send("Node js working..")
})

// app.get('/upload/:id',async (req,res)=>{
//     try {
//         let showdata = await showModel.findById(req.params.id).populate("episodes");
//         if(!showdata) return res.status(404).send("show data not found!")
//     console.log(showdata)
//     res.render("test",{showdata});
//     } catch (error) {
//          console.error(error);
//         res.status(500).send("Error loading upload page");
//     }
// })

// app.get("/show",(req,res)=>{
//     res.render("showdata")
// })

// app.get("/logout",(req,res)=>{
    
//     res.render('showdata')
// })


// dynamic port
const PORT = process.env.PORT || 3001;
app.listen(PORT,()=>{
    console.log(`Server running... on Port: ${PORT}`);
    
});