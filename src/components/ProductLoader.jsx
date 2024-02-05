import ProductItemLoader from "./ProductItemLoader";

export default function ProductLoader({ componentName }) {
  return (
    <div className="scrollbar-primary animate-pulse overflow-y-auto">
      <ProductItemLoader componentName={componentName} />
      <ProductItemLoader componentName={componentName} />
      <ProductItemLoader componentName={componentName} />
    </div>
  );
}
