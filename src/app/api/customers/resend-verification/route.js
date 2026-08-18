import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import { sendVerificationEmail } from "@/lib/email";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required." },
        { status: 400 },
      );
    }

    const customer = await prisma.customer.findUnique({
      where: { email },
    });

    if (!customer) {
      return NextResponse.json({
        success: true,
        message:
          "If an account exists for this email, a verification email has been sent.",
      });
    }

    if (customer.emailVerified) {
      return NextResponse.json(
        { error: "This email is already verified. You can log in." },
        { status: 400 },
      );
    }

    const verificationToken = crypto.randomBytes(32).toString("hex");

    await prisma.customer.update({
      where: { id: customer.id },
      data: {
        verificationToken,
      },
    });

    await sendVerificationEmail(
      customer.email,
      customer.fullName,
      verificationToken,
    );

    return NextResponse.json({
      success: true,
      message: "Verification email sent again.",
    });
  } catch (error) {
    console.error("Resend verification error:", error);

    return NextResponse.json(
      { error: "Could not send verification email. Please try again." },
      { status: 500 },
    );
  }
}
