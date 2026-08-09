import { put } from "@vercel/blob";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const blob = await put(file.name, file, {
    access: "public",
    addRandomSuffix: true,
  });

  return NextResponse.json({ url: blob.url });
}
