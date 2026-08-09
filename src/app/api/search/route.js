import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") || "";

  if (!query.trim()) return NextResponse.json([]);

  const results = await prisma.product.findMany({
    where: { title: { contains: query, mode: "insensitive" } },
    take: 6,
  });

  return NextResponse.json(results);
}
