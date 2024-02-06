import ProductItemLoader from "@/components/ProductItemLoader";

const numOfProductGroups = new Array(3).fill(null);
const numOfProducts = new Array(4).fill(null);

export default function ReleaseLoader() {
  return (
    <div className="scrollbar-primary animate-pulse overflow-y-auto">
      {numOfProductGroups.map(() => (
        <>
          <div className="mx-6 mt-2 h-4 w-36 rounded-sm bg-muted"></div>
          {numOfProducts.map((_, i) => (
            <ProductItemLoader key={i} />
          ))}
        </>
      ))}
    </div>
  );
}
