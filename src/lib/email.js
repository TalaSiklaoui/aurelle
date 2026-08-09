import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOrderConfirmationEmail(order) {
  const itemsHtml = order.items
    .map(
      (item) => `
        <tr>
          <td style="padding: 8px 0;">${item.title} × ${item.quantity}</td>
          <td style="padding: 8px 0; text-align: right;">$${(
            item.price * item.quantity
          ).toFixed(2)}</td>
        </tr>`,
    )
    .join("");

  const shippingLabel =
    order.shippingCost === 0 ? "Free" : `$${order.shippingCost.toFixed(2)}`;

  try {
    await resend.emails.send({
      from: "AURELLE <onboarding@resend.dev>",
      to: order.email,
      subject: `Order Confirmed — #${order.id}`,
      html: `
        <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
          <h2 style="font-family: Georgia, serif;">Thank you, ${order.fullName}!</h2>
          <p>Your AURELLE order #${order.id} has been received and is being processed.</p>
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            ${itemsHtml}
            <tr>
              <td style="padding: 8px 0; border-top: 1px solid #eee;">Subtotal</td>
              <td style="padding: 8px 0; border-top: 1px solid #eee; text-align: right;">
                $${order.subtotal.toFixed(2)}
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0;">Delivery</td>
              <td style="padding: 8px 0; text-align: right;">${shippingLabel}</td>
            </tr>
          </table>
          <p><strong>Total: $${order.total.toFixed(2)}</strong></p>
          <p style="color: #666; font-size: 13px;">
            Delivering to: ${order.address}${
              order.apartment ? ", " + order.apartment : ""
            }, ${order.city}, ${order.postalCode}, ${order.country}
          </p>
          <p style="color: #666; font-size: 13px;">
            You can check your order status anytime using your email and order number #${order.id}.
          </p>
        </div>
      `,
    });
  } catch (err) {
    console.error("Failed to send confirmation email:", err);
  }
}
