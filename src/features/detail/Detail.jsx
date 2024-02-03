import { useState } from "react";
import ProductInfo from "./ProductInfo";
import ResaleMarket from "./ResaleMarket";
import ProductReview from "./ProductReview";

export default function Detail() {
  const [sizes, setSizes] = useState([]);
  const [query, setQuery] = useState("");

  return (
    <section className="scrollbar-primary space-y-6 overflow-y-auto px-32 py-8">
      <div className="rounded-md border border-border px-8 py-6 text-card-foreground">
        <ProductInfo setSizes={setSizes} setQuery={setQuery} />
      </div>
      <div className="rounded-md border border-border p-8">
        <ResaleMarket sizes={sizes} />
      </div>
      <div className="col-span-2 rounded-md border border-border p-8">
        <ProductReview query={query} />
      </div>
    </section>
  );
}
