import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await request.json();

  const product = await prisma.product.create({
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
