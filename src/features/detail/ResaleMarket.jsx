import { useEffect, useState } from "react";
import useGlobalState from "@/context/Context";
import { useQuery } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/Select";
import ResaleMarketLoader from "./ResaleMarketLoader";
import ResaleMarketItem from "./ResaleMarketItem";

/**
 * Fetches product information data from our API endpoint.
 * @param {string} query - The product name query.
 * @param {string} country - The sekected country.
 * @returns {Promise<Object[]>} A promise that resolves to an array of relevant youtube video ids.
 * @throws {Error} Throws an error if the data fetching process fails.
 */
async function fetchResaleMarketPrices(sku, selectedSize, country) {
  const response = await fetch(
    `https://api.sneakify.org/resale?sku=${sku}&size=${selectedSize}&country=${country}`,
  );
  if (!response.ok) throw new Error("Something went wrong ☹");

  return await response.json();
}

/**
 * This component fetches and renders a table of secondary market prices from multiple resale platforms.
 * This component also handles loading states and errors, displaying appropriate messages.
 * @param {string[]} sizes - An array of sizes available for users to select to look at prices for each size.
 * @returns {ReactNode} A React element that renders a table of secondary market prices from multiple resale platforms.
 */
export default function ResaleMarket({ sizes }) {
  // Access global state from global context provider
  const { country, sku } = useGlobalState();
  // State to store which is the currently selected size
  const [selectedSize, setSelectedSize] = useState(undefined);
  // Fetch resale data using React query based on sku, selectedSize and country.
  // Only start fetching when sku and selectedSize are available.
  const { status, data, error } = useQuery({
    queryKey: ["resaleMarket", sku, selectedSize, country],
    queryFn: () => fetchResaleMarketPrices(sku, selectedSize, country),
    enabled: sku && selectedSize ? true : false,
    staleTime: Infinity,
  });

  // When the size array changes, a new product item has been selected and therefore, select the first available size by default
  useEffect(() => {
    if (sizes.length) setSelectedSize(sizes[0]);
  }, [sizes]);

  // If pending status, render skeleton loader
  if (status === "pending") return <ResaleMarketLoader />;
  // If error status, render error message
  if (status === "error")
    return (
      <>
        <h3 className="mb-8 text-xl font-semibold text-foreground">
          Resale Market Prices
        </h3>
        <div className="text-center font-semibold">{error.message}</div>
      </>
    );

  // If success status, render a table of secondary market prices from multiple resale platforms
  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <h3 className="text-xl font-semibold text-foreground">
          Resale Market Prices
        </h3>
        <Select value={selectedSize} onValueChange={setSelectedSize}>
          <SelectTrigger className="w-28">
            <SelectValue placeholder={`US ${sizes[0]}`} />
          </SelectTrigger>
          <SelectContent>
            {sizes.map((size) => (
              <SelectItem key={size} value={size}>
                US {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="rounded-md border border-border">
        <table className="w-full divide-y divide-border">
          <thead className="text-sm font-semibold text-muted-foreground">
            <tr>
              <td className="px-6 py-4">Marketplace</td>
              <td className="px-6">Lowest Ask</td>
              <td className="px-6">Last Sale</td>
              <td className="px-6">Fees</td>
              <td className="px-6">Payout</td>
            </tr>
          </thead>
          <tbody className="divide-y divide-border text-sm">
            {data.map((marketplaceInfo) => (
              <ResaleMarketItem
                key={marketplaceInfo.marketplace}
                marketplaceInfo={marketplaceInfo}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
