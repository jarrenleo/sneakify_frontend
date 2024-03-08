import ProductItemLoader from "@/components/ProductItemLoader";

const numOfProductGroups = new Array(3).fill(null);
const numOfProducts = new Array(4).fill(null);

/**
 * This component renders a skeleton placeholder when release data is being fetched.
 * @returns {ReactNode} A React element renders a skeleton placeholder when release data is being fetched.
 */
export default function ReleaseLoader() {
  return (
    <div className="scrollbar-primary animate-pulse overflow-y-auto">
      {numOfProductGroups.map((_, i) => (
        <div key={i}>
          <div className="mx-6 mt-2 h-4 w-36 rounded-sm bg-muted"></div>
          {numOfProducts.map((_, i) => (
            <ProductItemLoader key={i} />
          ))}
        </div>
      ))}
    </div>
  );
}
