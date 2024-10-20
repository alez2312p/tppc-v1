// import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import User from "@/app/models/User";
import { dbConnect } from "@/app/utils/dbConnect";

export async function PATCH(req: NextRequest) {
  try {
    const { email, newPassword } = await req.json();
    console.log({ email, newPassword });
    await dbConnect();

    const user = await User.findOne({ email });
    console.log({ user });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Haz la solicitud al otro endpoint "/api/new-wallet"
    const request = await fetch("http://localhost:3000/api/new-wallet", {
      method: "GET",
    });

    // Verifica si la solicitud fue exitosa
    if (!request.ok) {
      throw new Error("Failed to fetch /api/new-wallet");
    }

    // Obtén los datos de la respuesta
    const { cipherAddress, cipherPrivateKey } = await request.json();
    console.log({ cipherAddress, cipherPrivateKey });

    await User.updateOne(
      { email },
      {
        $set: {
          password: newPassword,
          state: "APPROVED",
          cipherAddress,
          cipherPrivateKey,
        },
      }
    );

    return NextResponse.json(
      { message: "Password updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error updating password" },
      { status: 500 }
    );
  }
}
