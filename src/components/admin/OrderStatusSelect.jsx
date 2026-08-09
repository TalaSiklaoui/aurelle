"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const statuses = ["pending", "processing", "delivered", "cancelled"];

const statusColors = {
  pending: { bg: "#fdf3e0", text: "#a9791f" },
  processing: { bg: "#e6eef7", text: "#2c5f8a" },
  delivered: { bg: "#e8f3ea", text: "#3a7d4f" },
  cancelled: { bg: "#f7e6e6", text: "#a33a3a" },
};

export default function OrderStatusSelect({ orderId, currentStatus }) {
  const router = useRouter();
  const [status, setStatus] = useState(currentStatus);
  const [saving, setSaving] = useState(false);
  const colors = statusColors[status] || statusColors.pending;

  async function handleChange(e) {
    const newStatus = e.target.value;
    setStatus(newStatus);
    setSaving(true);

    const res = await fetch(`/api/admin/orders/${orderId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });

    setSaving(false);

    if (res.ok) {
      router.refresh();
    } else {
      alert("Failed to update status.");
      setStatus(currentStatus);
    }
  }

  return (
    <select
      value={status}
      onChange={handleChange}
      disabled={saving}
      style={{
        fontSize: "11px",
        textTransform: "uppercase",
        letterSpacing: "0.5px",
        backgroundColor: colors.bg,
        color: colors.text,
        padding: "4px 8px",
        borderRadius: "3px",
        border: "none",
        cursor: saving ? "not-allowed" : "pointer",
        fontFamily: "inherit",
        fontWeight: "600",
      }}
    >
      {statuses.map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </select>
  );
}
