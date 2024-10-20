import { NextRequest, NextResponse } from "next/server";
import User from "@/app/models/User";
import { dbConnect } from "@/app/utils/dbConnect";

export async function GET() {
  try {
    await dbConnect();
    const user = await User.find({});

    // Imprimir los usuarios en la consola
    console.log("Usuarios en la colección:", user);

    return NextResponse.json({ message: "Conexión exitosa a MongoDB", user });
  } catch (error) {
    return NextResponse.json(
      { message: "Error al conectar a MongoDB", error },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const newUser = new User(data);
    const savedUser = await newUser.save();
    return NextResponse.json({
      message: "Usuario creado exitosamente",
      savedUser,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error creando el usuario", error },
      { status: 500 }
    );
  }
}
