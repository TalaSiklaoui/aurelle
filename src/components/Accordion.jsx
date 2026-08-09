"use client";

import { useState } from "react";

export default function Accordion({ title, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid #E5DFD3" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          background: "none",
          border: "none",
          padding: "16px 0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: "pointer",
          fontSize: "13px",
          letterSpacing: "1px",
          textTransform: "uppercase",
          color: "var(--black)",
        }}
      >
        {title}
        <span>{open ? "−" : "+"}</span>
      </button>
      {open && (
        <p
          style={{
            paddingBottom: "16px",
            fontSize: "13px",
            color: "var(--gray-text)",
            lineHeight: "1.6",
          }}
        >
          {children}
        </p>
      )}
    </div>
  );
}
