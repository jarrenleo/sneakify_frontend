const numOfEmbeds = new Array(3).fill(null);

/**
 * This component renders a skeleton placeholder when product review data is being fetched.
 * @returns {ReactNode} A React element renders a skeleton placeholder when product review data is being fetched.
 */
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
