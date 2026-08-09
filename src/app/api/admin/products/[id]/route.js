import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const data = await request.json();

  const product = await prisma.product.update({
    where: { id: parseInt(id) },
    data: {
      title: data.title,
      price: parseFloat(data.price),
      image: data.image,
      category: data.category,
      description: data.description,
    },
  });

  return NextResponse.json(product);
}

export async function DELETE(request, { params }) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  await prisma.product.delete({ where: { id: parseInt(id) } });

  return NextResponse.json({ success: true });
}
