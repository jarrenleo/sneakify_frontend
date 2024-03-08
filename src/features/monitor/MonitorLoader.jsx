import ProductItemLoader from "@/components/ProductItemLoader";

const numOfProducts = new Array(13).fill(null);

/**
 * This component renders a skeleton placeholder when monitor data is being fetched.
 * @returns {ReactNode} A React element renders a skeleton placeholder when monitor data is being fetched.
 */
export default function MonitorLoader() {
  return (
    <div className="scrollbar-primary overflow-y-auto">
      {numOfProducts.map((_, i) => (
        <ProductItemLoader key={i} />
      ))}
    </div>
  );
}
