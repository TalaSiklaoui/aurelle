import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();

  if (!session || session.user.role !== "customer") {
    return NextResponse.json({ order: null });
  }

  const lastOrder = await prisma.order.findFirst({
    where: { email: session.user.email },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ order: lastOrder });
}
