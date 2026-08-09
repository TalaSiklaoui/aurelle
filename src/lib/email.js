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

export async function sendVerificationEmail(email, fullName, token) {
  const verifyUrl = `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/verify-email?token=${token}`;

  try {
    await resend.emails.send({
      from: "AURELLE <onboarding@resend.dev>",
      to: email,
      subject: "Verify your AURELLE account",
      html: `
        <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
          <h2 style="font-family: Georgia, serif;">Welcome, ${fullName}!</h2>
          <p>Please confirm your email to activate your AURELLE account.</p>
          <a href="${verifyUrl}" style="display: inline-block; background: #1a1a1a; color: #c9a24b; padding: 12px 24px; text-decoration: none; border-radius: 4px; margin: 16px 0;">
            Verify Email
          </a>
          <p style="color: #666; font-size: 13px;">
            If you didn't create this account, you can ignore this email.
          </p>
        </div>
      `,
    });
  } catch (err) {
    console.error("Failed to send verification email:", err);
  }
}
