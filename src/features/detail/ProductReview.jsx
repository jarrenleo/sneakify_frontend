import { useGlobalState } from "@/context/globalContext";
import { useQuery } from "@tanstack/react-query";

async function getProductReview(query, country) {
  const response = await fetch(
    `http://localhost:8888/video?q=${query}&country=${country}`,
  );
  if (!response.ok) throw new Error("Something went wrong ☹");

  return await response.json();
}

// Add loading state

export default function ProductReview({ query }) {
  const { country } = useGlobalState();
  const { status, data, error } = useQuery({
    queryKey: ["productReview", query, country],
    queryFn: () => getProductReview(query, country),
  });

  if (status === "pending") return <div>Loading...</div>;
  if (status === "error")
    return (
      <>
        <h3 className="mb-8 text-xl font-semibold">Product Reviews</h3>
        <div className="text-center font-semibold">{error.message}</div>
      </>
    );

  return (
    <>
      <h3 className="mb-6 text-xl font-semibold">Product Reviews</h3>
      <div className="scrollbar-primary flex items-center gap-8 overflow-x-auto pb-6">
        {data.map((data) => (
          <iframe
            key={data.videoId}
            width="300"
            height="255"
            src={`https://www.youtube.com/embed/${data.videoId}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        ))}
      </div>
    </>
  );
}
