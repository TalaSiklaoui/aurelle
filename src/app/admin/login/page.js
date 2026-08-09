"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
        }}
      >
        <h2
          style={{
            marginBottom: "8px",
            textAlign: "center",
          }}
        >
          Admin Login
        </h2>
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

        <label style={{ fontSize: "13px", color: "var(--gray-text)" }}>
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "10px 12px",
            marginTop: "6px",
            marginBottom: "18px",
            border: "1px solid #ddd",
            borderRadius: "3px",
            fontSize: "14px",
          }}
        />

        <label style={{ fontSize: "13px", color: "var(--gray-text)" }}>
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "10px 12px",
            marginTop: "6px",
            marginBottom: "24px",
            border: "1px solid #ddd",
            borderRadius: "3px",
            fontSize: "14px",
          }}
        />

        {error && (
          <p
            style={{ color: "#b23b3b", fontSize: "13px", marginBottom: "16px" }}
          >
            {error}
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
