const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodoverride=require("method-override")
const Chat = require("./Model/chat"); 
const app = express();
const port = 8000;

// EJS setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname,"public")));
app.use(methodoverride("_method"))

//mongodb

mongoose.connect("mongodb://127.0.0.1:27017/whatsapp", {
}).then(() => {
    console.log("MongoDB connected");
}).catch((err) => {
    console.error("MongoDB connection error:", err);
});

// Middleware
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
    res.send("server is working");
});

//index route
app.get("/chats", async (req, res) => {
    const chats = await Chat.find();
    res.render("index.ejs", { chats });
});

app.get("/chats/new", async (req, res) => {
    res.render("new.ejs")
});
//post new
app.post("/chats",(req,res)=>{
    let {from,to,msg}=req.body
    const newchat= new Chat({
        from:from,
        to:to,
        msg:msg,
        created_at:new Date()
    })
    newchat.save().then(
        ()=>console.log("chat is saved")
    ).catch(e=>console.log(e))
    res.redirect("/chats");
})

//show
// app.get("/chats/:id",async (req,res,next)=>{
//     let {id}=req.params
//     let chat = await Chat.findById(id)
//     if(!chat){
//         next(new ExpressError(500,"Chat not found"))
//     }
//     res.render("edit.ejs",{chat})
// })
//update
app.get("/chats/:id/edit",async (req,res)=>{
    let {id}=req.params
    let chat=await Chat.findById(id)
    res.render("edit.ejs",{chat})
})
app.put("/chats/:id",async (req,res)=>{
  let {id}=req.params
    let {msg : newmsg}=req.body
    console.log(newmsg)
    let updatedchat = await Chat.findByIdAndUpdate(
        id,
        {msg:newmsg},
        {runValidators:true},{new:true}
    )
    console.log(updatedchat)
    res.redirect("/chats")
})
app.delete("/chats/:id", async (req,res)=>{
    let {id}=req.params
    let deletedchat= await Chat.findByIdAndDelete(id)
    console.log(deletedchat)
    res.redirect("/chats")
})
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
