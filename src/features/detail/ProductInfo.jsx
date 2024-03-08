import { useEffect } from "react";
import useGlobalState from "@/context/Context";
import { useQuery } from "@tanstack/react-query";
import ProductInfoLoader from "./ProductInfoLoader";

/**
 * Fetches product information data from our API endpoint.
 * @param {string} channel - The selected channel.
 * @param {string} sku - The selected stock keeping unit.
 * @param {string} country - The selected country.
 * @param {string} timeZone - The current timeZone.
 * @returns {Promise<Object>} A promise that resolves to a product information object.
 * @throws {Error} Throws an error if the data fetching process fails.
 */
async function fetchProductInfo(channel, sku, country, timeZone) {
  const response = await fetch(
    `https://api.sneakify.org/product?channel=${channel}&sku=${sku}&country=${country}&timeZone=${timeZone}`,
  );
  if (!response.ok) throw new Error("Something went wrong ☹");

  return await response.json();
}

/**
 * This component fetches and renders the selected product information.
 * This component also handles loading states and errors, displaying appropriate messages.
 * @param {function} setSizes - The function to set the available product sizes.
 * @param {function} setQuery - The function to set the product name as query.
 * @returns {ReactNode} A React element that renders the selected product information.
 */
export default function ProductInfo({ setSizes, setQuery }) {
  // Access global state from global context provider
  const { country, channel, sku, timeZone } = useGlobalState();
  // Fetch product data using React query based on channel, sku country and timeZone.
  // Only start fetching when channel and sku are available.
  const { status, data, error } = useQuery({
    queryKey: ["productInfo", channel, sku, country],
    queryFn: () => fetchProductInfo(channel, sku, country, timeZone),
    enabled: channel && sku ? true : false,
  });

  // If data fetched successfully, set available sizes and product name query so that the ResaleMarket and ProductReview component can fetch the appropriate data based on this information.
  useEffect(() => {
    if (status !== "success") return;

    setSizes(
      data.sizesAndStockLevels.map(
        (sizeAndStockLevel) => sizeAndStockLevel.size,
      ),
    );

    setQuery(
      channel === "SNKRS Web"
        ? data.name
        : data.name + data.colour.split("/")[0],
    );
  }, [channel, status, data, setSizes, setQuery]);

  // If pending status, render skeleton loader
  if (status === "pending") return <ProductInfoLoader />;
  // If error status, render error message
  if (status === "error")
    return (
      <div className="my-auto text-center font-semibold">{error.message}</div>
    );

  const {
    name,
    colour,
    description,
    releaseDate,
    releaseTime,
    sku: productSku,
    retailPrice,
    currentPrice,
    discountRate,
    method,
    quantity,
    sizesAndStockLevels,
    productUrl,
    imageUrl,
  } = data;

  // If success status, render the product information
  return (
    <>
      <div className="mb-2 flex items-center">
        <img src={imageUrl} alt={name} className="h-20 w-20 rounded-full" />
        <div className="flex flex-col gap-0.5 p-6">
          <h3 className="mb-1 text-xl font-semibold leading-none">{name}</h3>
          <span className="text-sm text-muted-foreground">{colour}</span>
          <span className="text-xs text-muted-foreground">
            {releaseDate}, {releaseTime} &#10072; {productSku}
          </span>
        </div>
      </div>
      <p className="mb-8 text-wrap text-sm text-card-foreground">
        {description}
      </p>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <span className="mr-3 text-xl font-semibold">{currentPrice}</span>
          {discountRate !== 0 && (
            <>
              <span className="mr-2 text-sm font-semibold text-muted-foreground line-through">
                {retailPrice}
              </span>
              <span className="text-sm font-semibold text-emerald-500">
                {discountRate}% off
              </span>
            </>
          )}
        </div>
        <div className="flex items-center gap-1">
          <div className="items-center rounded-full border border-transparent bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground">
            {method}
          </div>
          <div className="items-center rounded-full border border-transparent bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground">
            {quantity} item(s) per checkout
          </div>
        </div>
      </div>
      <div className="flex items-end justify-between">
        <table className="w-1/2">
          <thead className="text-left text-sm font-semibold text-muted-foreground">
            <tr>
              <td className="py-2">Sizes</td>
              <td>Stock Levels</td>
            </tr>
          </thead>
          <tbody>
            {sizesAndStockLevels.map((data) => (
              <tr key={data.size}>
                <td>
                  <span className="rounded-full border border-transparent bg-primary px-2.5 py-0.5 text-xs font-semibold text-primary-foreground">
                    US {data.size}
                  </span>
                </td>
                <td>
                  <span className="rounded-full border border-transparent bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground">
                    {data.stockLevel}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <a
          className="items-center justify-center rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground ring-offset-background transition-colors hover:bg-secondary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          href={productUrl}
          target="_blank"
          rel="noreferrer"
        >
          View
        </a>
      </div>
    </>
  );
}
