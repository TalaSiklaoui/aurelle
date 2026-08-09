import { prisma } from "@/lib/prisma";

export default async function MessagesPage() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ marginBottom: "4px" }}>Messages</h1>
        <p style={{ color: "var(--gray-text)" }}>{messages.length} total</p>
      </div>

      {messages.length === 0 ? (
        <p style={{ color: "var(--gray-text)" }}>No messages yet.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {messages.map((msg) => (
            <div
              key={msg.id}
              style={{
                backgroundColor: "#fff",
                borderRadius: "8px",
                padding: "24px",
                border: "1px solid #f0eee9",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "8px",
                }}
              >
                <p style={{ fontWeight: "600" }}>{msg.name}</p>
                <p style={{ fontSize: "13px", color: "var(--gray-text)" }}>
                  {new Date(msg.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              <p
                style={{
                  fontSize: "13px",
                  color: "var(--gray-text)",
                  marginBottom: "12px",
                }}
              >
                {msg.email}
                {msg.subject ? ` · ${msg.subject}` : ""}
              </p>
              <p style={{ fontSize: "14px", lineHeight: "1.6" }}>
                {msg.message}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
