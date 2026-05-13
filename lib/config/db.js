// import mongoose from "mongoose";

// export const ConnectDB = async () =>{
//     await mongoose.connect('mongodb+srv://Bilu:Bilu2004@cluster0.xzgdicp.mongodb.net/blog')
//     console.log("DB connected");
// }

import mongoose from "mongoose";

export const ConnectDB = async () => {
  try {

    if (mongoose.connections[0].readyState) {
      console.log("DB already connected");
      return;
    }

    await mongoose.connect(process.env.MONGODB_URI);

    console.log("DB connected");

  } catch (error) {

    console.log("MongoDB Connection Error:", error);

  }
};