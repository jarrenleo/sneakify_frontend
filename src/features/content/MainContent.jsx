import ProductInfo from "./ProductInfo";
import Marketplace from "./Marketplace";
import ProductReview from "./ProductReview";
import { useState } from "react";

export default function MainContent({ channel, sku, country, timeZone }) {
  const [sizes, setSizes] = useState([]);

  return (
    <section className="scrollbar-primary space-y-6 overflow-y-auto px-32 py-8">
      <div className="rounded-md border border-border px-8 py-6 text-card-foreground">
        <ProductInfo
          channel={channel}
          sku={sku}
          country={country}
          timeZone={timeZone}
          setSizes={setSizes}
        />
      </div>
      <div className="rounded-md border border-border p-8">
        <Marketplace sku={sku} sizes={sizes} country={country} />
      </div>
      <ProductReview />
    </section>
  );
}
