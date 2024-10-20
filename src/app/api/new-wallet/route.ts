import { ethers } from "ethers";
import CryptoJS from "crypto-js";
import { NextResponse } from "next/server";

const secretKey = process.env.SECRET_KEY!;

export async function GET() {
  try {
    // Generar una nueva wallet
    const wallet = ethers.Wallet.createRandom();

    // Cifrar la clave privada y la dirección pública
    const cipherPrivateKey = CryptoJS.AES.encrypt(
      wallet.privateKey,
      secretKey
    ).toString();
    const cipherAddress = CryptoJS.AES.encrypt(
      wallet.address,
      secretKey
    ).toString();

    // Enviar la clave privada y la dirección pública cifradas
    return NextResponse.json({ cipherAddress, cipherPrivateKey });
  } catch (error) {
    console.error("Error creating new wallet:", error);
    return NextResponse.json(
      { message: "Error creating new wallet" },
      { status: 500 }
    );
  }
}
