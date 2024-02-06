import ProductItemLoader from "@/components/ProductItemLoader";

const numOfProducts = new Array(13).fill(null);

export default function MonitorLoader() {
  return (
    <div className="scrollbar-primary overflow-y-auto">
      {numOfProducts.map((_, i) => (
        <ProductItemLoader key={i} />
      ))}
    </div>
  );
}
