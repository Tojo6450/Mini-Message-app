const mongoose = require("mongoose");
const Chat = require("./Model/chat"); 

 mongoose.connect("mongodb://127.0.0.1:27017/whatsapp", {
}).then(() => {
    console.log("MongoDB connected");
}).catch((err) => {
    console.error("MongoDB connection error:", err);
});

const sampleChats = [
    {
        from: "raj",
        to: "rahul",
        msg: "send me photo",
        created_at: new Date()
    },
    {
        from: "priya",
        to: "raj",
        msg: "meeting at 5?",
        created_at: new Date()
    },
    {
        from: "amit",
        to: "rahul",
        msg: "let’s play PUBG",
        created_at: new Date()
    },
    {
        from: "raj",
        to: "priya",
        msg: "sure, I’ll be there",
        created_at: new Date()
    }
];

// Insert into MongoDB
Chat.insertMany(sampleChats)
    .then(() => {
        console.log("Chats inserted successfully");
    })
    .catch((err) => {
        console.error("Error inserting chats:", err);
    });
