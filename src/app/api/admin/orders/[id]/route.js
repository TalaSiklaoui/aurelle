import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function PATCH(request, { params }) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const { status } = await request.json();

  const order = await prisma.order.update({
    where: { id: parseInt(id) },
    data: { status },
  });

  return NextResponse.json(order);
}
