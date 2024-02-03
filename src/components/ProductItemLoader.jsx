const numOfProducts = new Array(4).fill(null);

export default function ProductItemLoader({ componentName }) {
  return (
    <>
      {componentName === "release" && (
        <div className="mx-6 mt-2 h-4 w-36 rounded-sm bg-muted"></div>
      )}
      {numOfProducts.map((_, i) => (
        <div key={i} className="flex items-center gap-4 px-6 py-4">
          <div className="h-14 w-14 rounded-full bg-muted"></div>
          <div className="flex flex-col gap-1">
            <div className="h-3.5 w-60 rounded-md bg-muted"></div>
            <div className="h-3.5 w-10 rounded-md bg-muted"></div>
            <div className="h-3 w-32 rounded-md bg-muted"></div>
          </div>
        </div>
      ))}
    </>
  );
}
