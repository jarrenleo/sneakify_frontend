import { useQuery } from "@tanstack/react-query";
import ProductsSkeleton from "@/components/ProductsSkeleton";
import ProductItem from "@/components/ProductItem";

function filterProducts(products) {
  return products.filter((product) => product.isPopular === true);
}

export default function ReleaseProducts({
  country,
  timeZone,
  dispatch,
  isPopular,
}) {
  const { status, data, error } = useQuery({
    queryKey: ["releases", country, timeZone],
    queryFn: async function () {
      const response = await fetch(
        `http://localhost:8888/releases?country=${country}&timeZone=${timeZone}`,
      );
      if (!response.ok) throw Error("Failed to fetch releases ☹");

      const data = await response.json();
      if (!Object.keys(data).length) throw Error("No upcoming releases");

      const earliestReleaseProduct = Object.values(data)[0][0];
      dispatch({
        type: "setCurrentProduct",
        payload: {
          channel: earliestReleaseProduct.channel,
          sku: earliestReleaseProduct.sku,
        },
      });

      return data;
    },
    staleTime: Infinity,
  });

  if (status === "pending")
    return <ProductsSkeleton componentName={"releases"} />;

  if (status === "error")
    return (
      <div className="my-auto text-center font-semibold">{error.message}</div>
    );

  return (
    <div className="scrollbar-primary grow overflow-y-auto">
      {Object.entries(data).map(([date, productsInfo]) => {
        let filteredProductsInfo = productsInfo;
        if (isPopular) filteredProductsInfo = filterProducts(productsInfo);

        return (
          <ul key={date}>
            {filteredProductsInfo.length !== 0 && (
              <h2 className="px-6 pt-2 font-semibold">{date}</h2>
            )}
            {filteredProductsInfo.map((productInfo) => (
              <ProductItem
                key={productInfo.sku}
                productInfo={productInfo}
                dispatch={dispatch}
              />
            ))}
          </ul>
        );
      })}
    </div>
  );
}
