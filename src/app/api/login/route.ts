// import jwt from "jsonwebtoken";
import User from "@/app/models/User";
import { dbConnect } from "@/app/utils/dbConnect";
// import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    await dbConnect();
    const user = await User.findOne({ email });
    console.log({ user });
    // const isValidPassword = await bcrypt.compare(password, user.password);

    if (!password) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 400 }
      );
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error(error);
  }
}
