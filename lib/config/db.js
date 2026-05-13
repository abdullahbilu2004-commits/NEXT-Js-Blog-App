import mongoose from "mongoose";

export const ConnectDB = async () =>{
    await mongoose.connect('mongodb+srv://Bilu:Bilu2004@cluster0.xzgdicp.mongodb.net/blog')
    console.log("DB connected");
}