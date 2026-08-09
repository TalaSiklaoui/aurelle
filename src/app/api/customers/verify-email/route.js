import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { token } = await request.json();

  if (!token) {
    return NextResponse.json({ error: "Missing token" }, { status: 400 });
  }

  const customer = await prisma.customer.findUnique({
    where: { verificationToken: token },
  });

  if (!customer) {
    return NextResponse.json({ error: "Invalid token" }, { status: 404 });
  }

  await prisma.customer.update({
    where: { id: customer.id },
    data: { emailVerified: true, verificationToken: null },
  });

  return NextResponse.json({ success: true });
}
