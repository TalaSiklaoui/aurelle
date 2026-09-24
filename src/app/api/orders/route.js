import { prisma } from "@/lib/prisma";
import { sendOrderConfirmationEmail } from "@/lib/email";
import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();
  const {
    email,
    fullName,
    address,
    apartment,
    city,
    postalCode,
    country,
    phone,
    cartItems,
    subtotal,
    shippingCost,
    total,
  } = body;

  if (
    !email ||
    !fullName ||
    !address ||
    !city ||
    !postalCode ||
    !country ||
    !phone ||
    !cartItems?.length
  ) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 },
    );
  }

  const order = await prisma.order.create({
    data: {
      email,
      fullName,
      address,
      apartment: apartment || null,
      city,
      postalCode,
      country,
      phone,
      subtotal,
      shippingCost,
      total,
      items: {
        create: cartItems.map((item) => ({
          productId: item.id,
          title: item.title,
          price: item.price,
          quantity: item.quantity,
          size: item.size || null,
        })),
      },
    },
  });

  await sendOrderConfirmationEmail({
    id: order.id,
    email,
    fullName,
    address,
    apartment,
    city,
    postalCode,
    country,
    subtotal,
    shippingCost,
    total,
    items: cartItems,
  });
  return NextResponse.json({ success: true, orderId: order.id });
}
