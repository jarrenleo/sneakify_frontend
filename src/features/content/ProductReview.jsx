import { productReviewIds } from "../../../data/productReviewData.js";

export default function ProductReview() {
  return (
    <div className="col-span-2 rounded-md border border-border p-8">
      <h3 className="mb-6 text-xl font-semibold">Product Reviews</h3>
      <div className="scrollbar-primary flex items-center gap-8 overflow-x-auto pb-6">
        {productReviewIds.map((id) => (
          <iframe
            key={id}
            width="300"
            height="255"
            src={`https://www.youtube.com/embed/${id}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        ))}
      </div>
    </div>
  );
}
