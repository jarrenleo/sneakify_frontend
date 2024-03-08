import useGlobalState from "@/context/GlobalContext";
import { useQuery } from "@tanstack/react-query";
import ProductReviewLoader from "./ProductReviewLoader";

/**
 * Fetches product information data from our API endpoint.
 * @param {string} query - The product name query.
 * @param {string} country - The selected country.
 * @returns {Promise<Object[]>} A promise that resolves to an array of relevant youtube video ids.
 * @throws {Error} Throws an error if the data fetching process fails.
 */
async function getProductReview(query, country) {
  const response = await fetch(
    `https://api.sneakify.org/review?q=${query}&country=${country}`,
  );
  if (!response.ok) throw new Error("Something went wrong ☹");

  return await response.json();
}

/**
 * This component fetches and renders a list of related product review video embeds.
 * This component also handles loading states and errors, displaying appropriate messages.
 * @param {string} query - The product name query to fetch relevant youtube video ids.
 * @returns {ReactNode} A React element that renders a list of related product review videos.
 */
export default function ProductReview({ query }) {
  // Access global state from global context provider
  const { country } = useGlobalState();
  // Fetch review data using React query based on query and country.
  // Only start fetching when query and country are available.
  const { status, data, error } = useQuery({
    queryKey: ["productReview", query, country],
    queryFn: () => getProductReview(query, country),
    enabled: query && country ? true : false,
  });

  // If pending status, render skeleton loader
  if (status === "pending") return <ProductReviewLoader />;
  // If error status, render error message
  if (status === "error")
    return (
      <>
        <h3 className="mb-8 text-xl font-semibold">Product Reviews</h3>
        <div className="text-center font-semibold">{error.message}</div>
      </>
    );

  // If success status, render a list of related product review video embeds
  return (
    <>
      <h3 className="mb-8 text-xl font-semibold">Product Reviews</h3>
      <div className="scrollbar-primary flex items-center gap-8 overflow-x-auto pb-6">
        {data.map((data, i) => (
          <iframe
            key={data.videoId}
            title={`${query} product review video ${i}`}
            width="300"
            height="255"
            src={`https://www.youtube.com/embed/${data.videoId}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ))}
      </div>
    </>
  );
}
