"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <Suspense fallback={null}>
      <RegisterForm />
    </Suspense>
  );
}

function RegisterForm() {
  const searchParams = useSearchParams();
  const oauthError = searchParams.get("error");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [registered, setRegistered] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/customers/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, fullName }),
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Something went wrong.");
      return;
    }

    setRegistered(true);
  }

  if (registered) {
    return (
      <div
        style={{
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 20px",
        }}
      >
        <div
          style={{
            backgroundColor: "#fff",
            padding: "40px",
            borderRadius: "8px",
            border: "1px solid #f0eee9",
            maxWidth: "380px",
            textAlign: "center",
          }}
        >
          <h2 style={{ marginBottom: "12px" }}>Check Your Email</h2>
          <p style={{ color: "var(--gray-text)" }}>
            We sent a verification link to <strong>{email}</strong>. Click it to
            activate your account.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "#fff",
          padding: "40px",
          borderRadius: "8px",
          border: "1px solid #f0eee9",
          width: "100%",
          maxWidth: "380px",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "8px" }}>
          Create Account
        </h2>
        <p
          style={{
            color: "var(--gray-text)",
            fontSize: "14px",
            textAlign: "center",
            marginBottom: "28px",
          }}
        >
          Welcome to AURELLE — create your account
        </p>

        <label style={labelStyle}>Full Name</label>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          style={inputStyle}
        />

        <label style={labelStyle}>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={inputStyle}
        />

        <label style={labelStyle}>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          style={inputStyle}
        />

        {error && (
          <p
            style={{ color: "#b23b3b", fontSize: "13px", marginBottom: "16px" }}
          >
            {error}
          </p>
        )}

        {oauthError === "AccountExists" && (
          <p
            style={{
              color: "#b23b3b",
              fontSize: "13px",
              marginBottom: "16px",
              textAlign: "center",
            }}
          >
            An account already exists for that Google email. Please log in
            instead.
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "var(--black)",
            color: "var(--gold)",
            border: "none",
            borderRadius: "3px",
            fontSize: "14px",
            cursor: loading ? "not-allowed" : "pointer",
            marginBottom: "16px",
          }}
        >
          {loading ? "Creating..." : "Create Account"}
        </button>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            margin: "24px 0",
          }}
        >
          <div style={{ flex: 1, height: "1px", backgroundColor: "#e5e0d8" }} />
          <span style={{ fontSize: "12px", color: "var(--gray-text)" }}>
            or
          </span>
          <div style={{ flex: 1, height: "1px", backgroundColor: "#e5e0d8" }} />
        </div>

        <button
          type="button"
          onClick={() => {
            document.cookie = "google_intent=register; path=/; max-age=60";
            signIn("google", { callbackUrl: "/account" });
          }}
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#fff",
            color: "var(--black)",
            border: "1px solid #ddd",
            borderRadius: "3px",
            fontSize: "14px",
            cursor: "pointer",
            marginBottom: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          <GoogleIcon />
          Continue with Google
        </button>

        <p
          style={{
            fontSize: "13px",
            textAlign: "center",
            color: "var(--gray-text)",
          }}
        >
          Already have an account?{" "}
          <Link href="/login" style={{ color: "var(--gold)" }}>
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48">
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.6-6 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.5 29.6 4.5 24 4.5 12.7 4.5 3.5 13.7 3.5 25S12.7 45.5 24 45.5 44.5 36.3 44.5 25c0-1.6-.2-3.1-.4-4.5z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.7l6.6 4.8C14.5 15.5 18.9 12.5 24 12.5c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.5 29.6 4.5 24 4.5c-7.6 0-14.1 4.3-17.7 10.2z"
      />
      <path
        fill="#4CAF50"
        d="M24 45.5c5.5 0 10.4-1.9 14.2-5.1l-6.6-5.4c-2 1.4-4.6 2.3-7.6 2.3-5.3 0-9.7-3.4-11.3-8.1l-6.6 5.1C9.7 41.1 16.3 45.5 24 45.5z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4.1 5.5l6.6 5.4C41.8 35.5 44.5 30.6 44.5 25c0-1.6-.2-3.1-.4-4.5z"
      />
    </svg>
  );
}

const labelStyle = {
  display: "block",
  fontSize: "13px",
  color: "var(--gray-text)",
  marginBottom: "6px",
};

const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  marginBottom: "18px",
  border: "1px solid #ddd",
  borderRadius: "3px",
  fontSize: "14px",
  fontFamily: "inherit",
  boxSizing: "border-box",
};
