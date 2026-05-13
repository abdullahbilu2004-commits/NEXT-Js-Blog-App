import { ConnectDB } from "@/lib/config/db";
import EmailModel from "@/lib/models/EmailModels";
import { NextResponse } from "next/server";

const LoadDB = async () => {
    await ConnectDB();
}
LoadDB();



export async function POST(request) {
  await ConnectDB();
  const formData = await request.formData();
  const email = formData.get("email");

  if (!email) {
    return NextResponse.json({ success: false, msg: "Email is required" }, { status: 400 });
  }

  await EmailModel.create({ email });
  return NextResponse.json({ success: true, msg: "E-mail subscribed" });
}

export async function GET(request) {
  await ConnectDB();
  const emails = await EmailModel.find({});
  return NextResponse.json({ emails });
}

export async function DELETE(request) 
{
   const id = await request.nextUrl.searchParams.get("id")
   await EmailModel.findByIdAndDelete(id)
   return NextResponse.json({success:true ,msg:"Email deleted"})  
}




