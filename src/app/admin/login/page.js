"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setLoading(true);

    const result = await signIn("admin-login", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Invalid email or password.");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "var(--cream)",
        padding: "40px 20px",
        boxSizing: "border-box",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "#fff",
          padding: "48px",
          borderRadius: "4px",
          width: "100%",
          maxWidth: "380px",
          boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
          boxSizing: "border-box",
        }}
      >
        {/* TITLE */}

        <h2
          style={{
            marginBottom: "8px",
            textAlign: "center",
          }}
        >
          Admin Login
        </h2>

        {/* BACK TO SITE */}

        <div
          style={{
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          <Link
            href="/"
            style={{
              display: "inline-block",
              fontSize: "13px",
              color: "var(--gray-text)",
              textDecoration: "none",
            }}
          >
            ‹ Back to site
          </Link>
        </div>

        <p
          style={{
            color: "var(--gray-text)",
            fontSize: "14px",
            textAlign: "center",
            marginBottom: "32px",
          }}
        >
          Sign in to manage AURELLE
        </p>

        {/* EMAIL */}

        <label style={labelStyle}>Email</label>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          style={inputStyle}
        />

        {/* PASSWORD */}

        <label style={labelStyle}>Password</label>

        <div style={passwordWrapperStyle}>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            style={passwordInputStyle}
          />

          <button
            type="button"
            onClick={() => setShowPassword((current) => !current)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            title={showPassword ? "Hide password" : "Show password"}
            style={eyeButtonStyle}
          >
            <EyeIcon hidden={showPassword} />
          </button>
        </div>

        {/* ERROR */}

        {error && (
          <p
            style={{
              color: "#b23b3b",
              fontSize: "13px",
              marginBottom: "16px",
            }}
          >
            {error}
          </p>
        )}

        {/* SIGN IN */}

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
            letterSpacing: "0.5px",
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}

function EyeIcon({ hidden }) {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12z" />

      <circle cx="12" cy="12" r="2.5" />

      {hidden && <path d="M4 4l16 16" />}
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

const passwordWrapperStyle = {
  position: "relative",
  width: "100%",
  marginBottom: "24px",
};

const passwordInputStyle = {
  width: "100%",
  padding: "10px 44px 10px 12px",
  border: "1px solid #ddd",
  borderRadius: "3px",
  fontSize: "14px",
  fontFamily: "inherit",
  boxSizing: "border-box",
};

const eyeButtonStyle = {
  position: "absolute",
  right: "10px",
  top: "50%",
  transform: "translateY(-50%)",
  border: "none",
  background: "transparent",
  padding: "5px",
  color: "#777",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
