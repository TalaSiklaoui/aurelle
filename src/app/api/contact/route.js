import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { name, email, subject, message } = await request.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  await prisma.contactMessage.create({
    data: { name, email, subject: subject || null, message },
  });

  return NextResponse.json({ success: true });
}
