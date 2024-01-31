const productItemCount = new Array(4).fill(null);

export default function ProductItemSkeleton({ componentName }) {
  return (
    <>
      {componentName === "releases" && (
        <div className="mx-auto my-4 h-4 w-36 rounded-full bg-muted"></div>
      )}
      {productItemCount.map((_, i) => (
        <div key={i} className="flex items-center gap-6 py-4 pl-8">
          <div className="h-14 w-14 rounded-full bg-muted"></div>
          <div className="flex flex-col gap-2">
            <div className="h-3.5 w-72 rounded-full bg-muted"></div>
            <div className="flex gap-1">
              <div className="h-3 w-16 rounded-full bg-muted"></div>
              <div className="h-3 w-16 rounded-full bg-muted"></div>
              <div className="h-3 w-12 rounded-full bg-muted"></div>
            </div>
            <div className="h-3 w-14 rounded-full bg-muted"></div>
          </div>
        </div>
      ))}
    </>
  );
}
