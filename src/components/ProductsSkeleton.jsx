import ProductItemSkeleton from "./ProductItemSkeleton";

export default function ProductsSkeleton({ componentName }) {
  return (
    <div className="scrollbar-primary grow animate-pulse overflow-y-auto">
      <ProductItemSkeleton componentName={componentName} />
      <ProductItemSkeleton componentName={componentName} />
      <ProductItemSkeleton componentName={componentName} />
    </div>
  );
}
