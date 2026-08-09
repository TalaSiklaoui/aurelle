"use client";

import { Suspense, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function CustomerLoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const oauthError = searchParams.get("error");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("customer-login", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Invalid email or password.");
      return;
    }

    router.push("/account");
    router.refresh();
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
        <h2 style={{ textAlign: "center", marginBottom: "8px" }}>Log In</h2>
        <p
          style={{
            color: "var(--gray-text)",
            fontSize: "14px",
            textAlign: "center",
            marginBottom: "28px",
          }}
        >
          Welcome back to AURELLE
        </p>

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
          style={inputStyle}
        />

        {error && (
          <p
            style={{ color: "#b23b3b", fontSize: "13px", marginBottom: "16px" }}
          >
            {error}
          </p>
        )}

        {oauthError === "NoAccount" && (
          <p
            style={{
              color: "#b23b3b",
              fontSize: "13px",
              marginBottom: "16px",
              textAlign: "center",
            }}
          >
            No AURELLE account found for that Google email. Please create an
            account first.
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
          {loading ? "Logging in..." : "Log In"}
        </button>

        <div
          style={{
            margin: "20px 0",
            textAlign: "center",
            fontSize: "12px",
            color: "var(--gray-text)",
          }}
        >
          — or —
        </div>

        <button
          type="button"
          onClick={() => {
            document.cookie = "google_intent=login; path=/; max-age=60";
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
          Don't have an account?{" "}
          <Link href="/register" style={{ color: "var(--gold)" }}>
            Create one
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
