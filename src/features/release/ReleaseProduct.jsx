import { useEffect } from "react";
import useGlobalState from "@/context/GlobalContext";
import { useQuery } from "@tanstack/react-query";
import ReleaseLoader from "./ReleaseLoader";
import ProductItem from "@/components/ProductItem";
import groupBy from "lodash.groupby";

function filterProducts(products) {
  return products.filter((product) => product.isPopular === true);
}

async function fetchReleaseProduct(country, timeZone) {
  const response = await fetch(
    `https://api.sneakify.org/release?country=${country}&timeZone=${timeZone}`,
  );
  if (!response.ok) throw new Error("Something went wrong ☹");

  const data = await response.json();
  if (!data.length)
    throw new Error("There are no upcoming products currently.");

  return data;
}

export default function ReleaseProduct({ popularToggle }) {
  const { country, channel, sku, timeZone, setProduct } = useGlobalState();
  const { status, data, error } = useQuery({
    queryKey: ["releaseProduct", country],
    queryFn: () => fetchReleaseProduct(country, timeZone),
    staleTime: Infinity,
  });

  useEffect(() => {
    if (data && !channel && !sku) setProduct(data[0].channel, data[0].sku);
  }, [data, channel, sku, setProduct]);

  if (status === "pending") return <ReleaseLoader />;
  if (status === "error")
    return <div className="text-center font-semibold">{error.message}</div>;

  let products = groupBy(data, "releaseDate");
  if (popularToggle) products = groupBy(filterProducts(data), "releaseDate");

  return (
    <div className="scrollbar-primary overflow-y-auto">
      {Object.keys(products).length ? (
        Object.entries(products).map(([date, productsInfo]) => (
          <ul key={date}>
            <li className="px-6 pt-2 font-semibold">{date}</li>
            {productsInfo.map((productInfo) => (
              <ProductItem key={productInfo.uuid} productInfo={productInfo} />
            ))}
          </ul>
        ))
      ) : (
        <div className="text-center font-semibold">
          There are no popular products currently.
        </div>
      )}
    </div>
  );
}
