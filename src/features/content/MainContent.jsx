import ProductInfo from "./ProductInfo";
import MarketplaceAggregation from "./MarketplaceAggregation";
import ProductReview from "./ProductReview";
import { product } from "../../../data/productData.js";
import { marketplaces } from "../../../data/marketplaceData.js";

export default function MainContent() {
  return (
    <section className="scrollbar-primary space-y-6 overflow-y-auto px-48 py-12">
      <ProductInfo product={product} />
      <MarketplaceAggregation marketplaces={marketplaces} />
      <ProductReview />
    </section>
  );
}
