import { Suspense } from "react";
import ShopClient from "@/components/ShopClient";

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <p style={{ textAlign: "center", padding: "80px" }}>Loading...</p>
      }
    >
      <ShopClient />
    </Suspense>
  );
}
