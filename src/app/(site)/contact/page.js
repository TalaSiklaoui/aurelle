"use client";

import { useState, useEffect } from "react";
import { getSession } from "next-auth/react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    async function loadSession() {
      const session = await getSession();
      if (session?.user?.role === "customer") {
        setForm((f) => ({
          ...f,
          name: session.user.name || "",
          email: session.user.email || "",
        }));
      }
    }
    loadSession();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      alert("Please fill in your name, email, and message.");
      return;
    }

    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } catch (err) {
      console.error("Failed to send message:", err);
    }

    setSent(true);
    setForm({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <div style={{ padding: "60px 40px", maxWidth: "1100px", margin: "0 auto" }}>
      <h1
        style={{ fontFamily: "Playfair Display, serif", marginBottom: "8px" }}
      >
        Get in Touch
      </h1>
      <p
        style={{
          color: "var(--gray-text)",
          marginBottom: "48px",
          maxWidth: "480px",
        }}
      >
        We&apos;d love to hear from you. Whether you have a question or need
        help, our team is here for you.
      </p>

      <div style={{ display: "flex", gap: "60px", flexWrap: "wrap" }}>
        <form onSubmit={handleSubmit} style={{ flex: "2 1 400px" }}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            style={inputStyle}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            style={inputStyle}
            required
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={form.subject}
            onChange={handleChange}
            style={inputStyle}
          />
          <textarea
            name="message"
            placeholder="Message"
            value={form.message}
            onChange={handleChange}
            rows={6}
            style={{
              ...inputStyle,
              resize: "vertical",
              fontFamily: "Inter, sans-serif",
            }}
            required
          />
          <button type="submit" style={sendBtnStyle}>
            {sent ? "Message Sent ✓" : "Send Message"}
          </button>
        </form>

        <div style={{ flex: "1 1 260px" }}>
          <ContactRow label="Email" value="hello@aurellejewelry.com" />
          <ContactRow label="Phone" value="+961 00 000 000" />
          <ContactRow
            label="Address"
            value="Tyre, South Governorate, Lebanon"
          />
          <ContactRow
            label="Hours"
            value={"Mon – Fri: 9:00 – 18:00\nSat: 10:00 – 14:00"}
          />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginTop: "32px",
            }}
          >
            <a href="#" style={{ color: "var(--black)", display: "flex" }}>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.3"
              >
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.5" fill="var(--black)" />
              </svg>
            </a>
            <span style={{ fontSize: "13px", color: "var(--black)" }}>
              Aurelle.Jewelry
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactRow({ label, value }) {
  return (
    <div style={{ marginBottom: "28px" }}>
      <p
        style={{
          fontSize: "11px",
          letterSpacing: "1px",
          textTransform: "uppercase",
          color: "var(--gold)",
          marginBottom: "6px",
        }}
      >
        {label}
      </p>
      <p
        style={{
          fontSize: "14px",
          color: "var(--black)",
          whiteSpace: "pre-line",
          lineHeight: "1.6",
        }}
      >
        {value}
      </p>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  marginBottom: "16px",
  border: "1px solid #E5DFD3",
  backgroundColor: "#fff",
  fontSize: "14px",
  fontFamily: "Inter, sans-serif",
  boxSizing: "border-box",
};
const sendBtnStyle = {
  backgroundColor: "var(--black)",
  color: "white",
  border: "none",
  padding: "16px 40px",
  fontSize: "13px",
  letterSpacing: "1px",
  textTransform: "uppercase",
  cursor: "pointer",
};
