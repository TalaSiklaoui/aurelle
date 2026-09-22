"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={null}>
      <VerifyEmailContent />
    </Suspense>
  );
}

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [status, setStatus] = useState(token ? "verifying" : "invalid");

  useEffect(() => {
    if (!token) return;

    fetch("/api/customers/verify-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    })
      .then((res) => {
        setStatus(res.ok ? "success" : "invalid");
      })
      .catch(() => {
        setStatus("invalid");
      });
  }, [token]);

  return (
    <div
      style={{
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
      }}
    >
      <div style={{ textAlign: "center", maxWidth: "400px" }}>
        {status === "verifying" && <p>Verifying your email...</p>}

        {status === "success" && (
          <>
            <h2 style={{ marginBottom: "12px" }}>Email Verified!</h2>
            <p style={{ color: "var(--gray-text)", marginBottom: "24px" }}>
              Your account is now active. You can log in.
            </p>

            <Link
              href="/login"
              style={{
                display: "inline-block",
                backgroundColor: "var(--black)",
                color: "var(--gold)",
                padding: "12px 24px",
                borderRadius: "4px",
                textDecoration: "none",
              }}
            >
              Go to Login
            </Link>
          </>
        )}

        {status === "invalid" && (
          <>
            <h2 style={{ marginBottom: "12px" }}>Invalid or Expired Link</h2>
            <p style={{ color: "var(--gray-text)" }}>
              This verification link isn&apos;t valid. Please try registering
              again.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
