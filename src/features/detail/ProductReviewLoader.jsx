const numOfEmbeds = new Array(3).fill(null);

export default function ProductReviewLoader() {
  return (
    <>
      <h3 className="mb-8 text-xl font-semibold">Product Reviews</h3>
      <div className="flex animate-pulse gap-8 pb-6">
        {numOfEmbeds.map((_, i) => (
          <div key={i} className=" h-48 w-64 rounded-md bg-muted"></div>
        ))}
      </div>
    </>
  );
}
