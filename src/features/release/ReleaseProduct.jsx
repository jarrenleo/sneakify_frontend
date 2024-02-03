import { useGlobalState } from "@/context/globalContext";
import { useQuery } from "@tanstack/react-query";
import ProductLoader from "@/components/ProductLoader";
import ProductItem from "@/components/ProductItem";
import groupBy from "lodash.groupby";

function filterProducts(products) {
  return products.filter((product) => product.isPopular === true);
}

async function getReleaseProduct(country, timeZone, setProduct) {
  const response = await fetch(
    `http://localhost:8888/release?country=${country}&timeZone=${timeZone}`,
  );
  if (!response.ok) throw new Error("Something went wrong ☹");

  const data = await response.json();
  if (!data.length)
    throw new Error("There are no upcoming products currently.");

  setProduct(data[0].channel, data[0].sku);

  return data;
}

export default function ReleaseProduct({ popularToggle }) {
  const { country, timeZone, setProduct } = useGlobalState();
  const { status, data, error } = useQuery({
    queryKey: ["releaseProduct", country, timeZone],
    queryFn: () => getReleaseProduct(country, timeZone, setProduct),
    staleTime: Infinity,
  });

  if (status === "pending") return <ProductLoader componentName={"release"} />;
  if (status === "error")
    return <div className="text-center font-semibold">{error.message}</div>;

  let products = groupBy(data, "releaseDate");
  if (popularToggle) products = groupBy(filterProducts(data), "releaseDate");

  return (
    <div className="scrollbar-primary grow overflow-y-auto">
      {Object.keys(products).length ? (
        Object.entries(products).map(([date, productsInfo]) => (
          <ul key={date}>
            <h2 className="px-6 pt-2 font-semibold">{date}</h2>
            {productsInfo.map((productInfo) => (
              <ProductItem key={productInfo.sku} productInfo={productInfo} />
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