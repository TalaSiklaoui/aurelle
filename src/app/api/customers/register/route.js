import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { email, password, fullName } = await request.json();

  if (!email || !password || !fullName) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const existing = await prisma.customer.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json(
      { error: "An account with this email already exists." },
      { status: 409 },
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const customer = await prisma.customer.create({
    data: { email, password: hashedPassword, fullName },
  });

  return NextResponse.json({ success: true, id: customer.id });
}
