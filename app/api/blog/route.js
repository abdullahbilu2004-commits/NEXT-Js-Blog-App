import { NextResponse } from "next/server";
import { ConnectDB } from '@/lib/config/db'
import { writeFile } from 'fs/promises'
import BlogModel from '@/lib/models/BlogModel'
const fs = require('fs')

const LoadDB = async () => {
  await ConnectDB();
}

LoadDB();


// API Endpoint to get all blogs 

export async function GET(reqeust) {
  const blogsID = reqeust.nextUrl.searchParams.get("id");

  if (blogsID) {
    const blog = await BlogModel.findById(blogsID);
    return NextResponse.json(blog)
  }
  else {

    const blogs = await BlogModel.find({});
    return NextResponse.json({ blogs })

  }

}


// API Endpoint for uploading blogs 

export async function POST(reqeust) {

  await ConnectDB();
  const formData = await reqeust.formData();
  const timestamp = Date.now();


  const image = formData.get('image');
  const imageByteData = await image.arrayBuffer();
  const buffer = Buffer.from(imageByteData);
  const path = `./public/${timestamp}_${image.name}`
  await writeFile(path, buffer);
  const imgUrl = `/${timestamp}_${image.name}`;

  const blogData = {
    title: `${formData.get("title")}`,
    description: `${formData.get("description")}`,
    category: `${formData.get("category")}`,
    author: `${formData.get("author")}`,
    image: `${imgUrl}`,
    authorImg: `${formData.get('authorImg')}`,
  };

  await BlogModel.create(blogData);
  console.log("Blog Saved");


  return NextResponse.json({ success: true, msg: "Blog Added" });


}


// Creating Endpoint to delete blogs 

export async function DELETE(request) {
  await ConnectDB();

  const id = request.nextUrl.searchParams.get("id");
  const blog = await BlogModel.findById(id);

  if (!blog) {
    return NextResponse.json({ success: false, msg: "Blog not found" }, { status: 404 });
  }

  fs.unlink(`./public${blog.image}`, (err) => {
    if (err) console.error("Image delete error:", err);
  });

  await BlogModel.findByIdAndDelete(id);
  return NextResponse.json({ success: true, msg: "Blog Deleted" });
}



