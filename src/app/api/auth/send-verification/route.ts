import { NextResponse } from "next/server";
import { sendVerificationEmail } from "@/lib/email";
import { setVerificationCode } from "@/lib/verification-store";

function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // Validate email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { message: "Please provide a valid email address" },
        { status: 400 }
      );
    }

    // Generate a 6-digit verification code
    const code = generateVerificationCode();
    
    // Store the code
    setVerificationCode(email, code);

    // Send the verification email
    await sendVerificationEmail(email, code);

    return NextResponse.json(
      { message: "Verification email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending verification email:", error);
    return NextResponse.json(
      { message: "Failed to send verification email" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const email = url.searchParams.get("email");
  const code = url.searchParams.get("code");

  if (!email || !code) {
    return NextResponse.json(
      { message: "Email and code are required" },
      { status: 400 }
    );
  }

  const storedData = verificationCodes.get(email);
  
  if (!storedData) {
    return NextResponse.json(
      { message: "No verification code found for this email" },
      { status: 400 }
    );
  }

  if (new Date() > storedData.expires) {
    verificationCodes.delete(email);
    return NextResponse.json(
      { message: "Verification code has expired" },
      { status: 400 }
    );
  }

  if (storedData.code !== code) {
    return NextResponse.json(
      { message: "Invalid verification code" },
      { status: 400 }
    );
  }

  // Code is valid - clean up and return success
  verificationCodes.delete(email);
  return NextResponse.json(
    { message: "Email verified successfully" },
    { status: 200 }
  );
} 