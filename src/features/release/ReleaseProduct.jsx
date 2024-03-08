import { useEffect } from "react";
import useGlobalState from "@/context/Context";
import { useQuery } from "@tanstack/react-query";
import ReleaseLoader from "./ReleaseLoader";
import ProductItem from "@/components/ProductItem";
import groupBy from "lodash.groupby";

/**
 * Filters the product list to only include popular products.
 * @param {Object[]} products - An array of products to filter.
 * @returns {Object[]} An array of products where each product has isPopular equal to true.
 */
function filterProducts(products) {
  return products.filter((product) => product.isPopular === true);
}

/**
 * Fetches upcoming release data from our API endpoint.
 * @param {string} country - The selected country.
 * @param {string} timeZone - The current timeZone.
 * @returns {Promise<Object[]>} A promise that resolves to an array of upcoming products.
 * @throws {Error} Throws an error if the data fetching process fails.
 */
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

/**
 * This component fetches and renders a list of release products grouped by release date, optionally filtered by popularity.
 * This component also handles loading states and errors, displaying appropriate messages.
 * @param {boolean} popularToggle - Indicates whether only popular products should be shown.
 * @returns {ReactNode} A React element that renders a list of release products grouped by release date.
 */
export default function ReleaseProduct({ popularToggle }) {
  // Access global state from global context provider
  const { country, channel, sku, timeZone, setProduct } = useGlobalState();
  // Fetch release data using React query based on country and timeZone
  const { status, data, error } = useQuery({
    queryKey: ["releaseProduct", country],
    queryFn: () => fetchReleaseProduct(country, timeZone),
    staleTime: Infinity,
  });

  // On the initial render when there is no channel and sku set, set the earliest release product as the product to display by default
  useEffect(() => {
    if (data && !channel && !sku) setProduct(data[0].channel, data[0].sku);
  }, [data, channel, sku, setProduct]);

  // If pending status, render skeleton loader
  if (status === "pending") return <ReleaseLoader />;
  // If error status, render error message
  if (status === "error")
    return <div className="text-center font-semibold">{error.message}</div>;

  // Group products by release date
  let products = groupBy(data, "releaseDate");
  // If popularToggle is on, filter the product first before grouping them
  if (popularToggle) products = groupBy(filterProducts(data), "releaseDate");

  // If success status, render the list of release products
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
        // If there are no upcoming release / popular products, render no product message
        <div className="text-center font-semibold">
          {`There are no ${
            popularToggle ? "popular" : "upcoming release"
          } products currently.`}
        </div>
      )}
    </div>
  );
}
