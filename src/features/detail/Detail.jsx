import { useState } from "react";
import ProductInfo from "./ProductInfo";
import ResaleMarket from "./ResaleMarket";
import ProductReview from "./ProductReview";

/**
 * This component renders the main section of the application.
 * It displays product information, resale market, and product reviews.
 * @returns {ReactNode} A react element that renders the detail component.
 */
export default function Detail() {
  const [sizes, setSizes] = useState([]);
  const [query, setQuery] = useState("");

  return (
    <section className="scrollbar-primary space-y-6 overflow-y-auto px-8 py-8 ">
      <div className="space-y-8 xl:mx-auto xl:max-w-screen-md">
        <div className="rounded-md border border-border px-8 py-6 text-card-foreground">
          <ProductInfo setSizes={setSizes} setQuery={setQuery} />
        </div>
        <div className="rounded-md border border-border p-8">
          <ResaleMarket sizes={sizes} />
        </div>
        <div className="rounded-md border border-border p-8">
          <ProductReview query={query} />
        </div>
      </div>
    </section>
  );
}
