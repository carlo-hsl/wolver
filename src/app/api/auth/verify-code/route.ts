import { NextResponse } from "next/server";
import { getVerificationCode, deleteVerificationCode } from "@/lib/verification-store";

export async function POST(request: Request) {
  try {
    const { email, code } = await request.json();
    console.log('Received verification request:', { email, code });

    if (!email || !code) {
      console.log('Missing email or code');
      return NextResponse.json(
        { message: "Email and code are required" },
        { status: 400 }
      );
    }

    const storedData = getVerificationCode(email);
    console.log('Stored data for email:', storedData);
    
    if (!storedData) {
      console.log('No verification code found');
      return NextResponse.json(
        { message: "No verification code found for this email" },
        { status: 400 }
      );
    }

    if (new Date() > storedData.expires) {
      console.log('Code expired');
      deleteVerificationCode(email);
      return NextResponse.json(
        { message: "Verification code has expired" },
        { status: 400 }
      );
    }

    if (storedData.code !== code) {
      console.log('Invalid code. Expected:', storedData.code, 'Received:', code);
      return NextResponse.json(
        { message: "Invalid verification code" },
        { status: 400 }
      );
    }

    // Code is valid - clean up and return success
    console.log('Code verified successfully');
    deleteVerificationCode(email);
    return NextResponse.json(
      { message: "Email verified successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error verifying code:", error);
    return NextResponse.json(
      { message: "Failed to verify code" },
      { status: 500 }
    );
  }
} 