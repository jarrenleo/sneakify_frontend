import { useQuery } from "@tanstack/react-query";
import ProductsSkeleton from "@/components/ProductsSkeleton";
import ProductItem from "@/components/ProductItem";

export default function ReleaseProducts() {
  const { status, data, error } = useQuery({
    queryKey: ["releases"],
    queryFn: async function () {
      const response = await fetch(
        "http://localhost:8888/releases?country=SG&timeZone=Asia/Singapore",
      );
      if (!response.ok)
        throw new Error("Failed to fetch releases. Please try again later.");

      return await response.json();
    },
  });

  if (status === "pending")
    return <ProductsSkeleton componentName={"releases"} />;

  if (status === "error")
    return (
      <div className="my-auto text-center font-semibold">{error.message}</div>
    );

  return (
    <div className="scrollbar-primary grow overflow-y-auto">
      {Object.keys(data).length ? (
        Object.entries(data).map(([date, productsInfo]) => {
          return (
            <ul key={date}>
              <h2 className="py-4 text-center font-semibold">{date}</h2>
              {productsInfo.map((productInfo) => (
                <ProductItem key={productInfo.sku} productInfo={productInfo} />
              ))}
            </ul>
          );
        })
      ) : (
        <div className="flex items-center justify-center font-semibold">
          No upcoming releases
        </div>
      )}
    </div>
  );
}
