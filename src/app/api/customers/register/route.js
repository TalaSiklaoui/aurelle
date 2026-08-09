import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import crypto from "crypto";
import dns from "dns/promises";
import { sendVerificationEmail } from "@/lib/email";
import { NextResponse } from "next/server";

async function domainCanReceiveMail(email) {
  if (process.env.NODE_ENV !== "production") {
    return true;
  }

  const domain = email.split("@")[1];
  if (!domain) return false;

  try {
    const records = await dns.resolveMx(domain);
    return records && records.length > 0;
  } catch (err) {
    if (err.code === "ENOTFOUND" || err.code === "ENODATA") {
      return false;
    }
    console.error("MX lookup error (allowing through):", err.code, domain);
    return true;
  }
}

export async function POST(request) {
  const { email, password, fullName } = await request.json();

  if (!email || !password || !fullName) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const validDomain = await domainCanReceiveMail(email);
  if (!validDomain) {
    return NextResponse.json(
      { error: "Please enter a real, valid email address." },
      { status: 400 },
    );
  }

  const existing = await prisma.customer.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json(
      { error: "An account with this email already exists." },
      { status: 409 },
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const verificationToken = crypto.randomBytes(32).toString("hex");

  await prisma.customer.create({
    data: {
      email,
      password: hashedPassword,
      fullName,
      emailVerified: false,
      verificationToken,
    },
  });

  await sendVerificationEmail(email, fullName, verificationToken);

  return NextResponse.json({ success: true });
}
