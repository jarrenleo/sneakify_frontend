import { useEffect, useState } from "react";
import useGlobalState from "@/context/globalContext";
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

async function fetchResaleMarketPrices(sku, selectedSize, country) {
  const response = await fetch(
    `http://localhost:8888/resale?sku=${sku}&size=${selectedSize}&country=${country}`,
  );
  if (!response.ok) throw new Error("Something went wrong ☹");

  return await response.json();
}

// Issues:
// No exception handling for products with no available sizes

export default function ResaleMarket({ sizes }) {
  const { country, sku } = useGlobalState();
  const [selectedSize, setSelectedSize] = useState(undefined);
  const { status, data, error } = useQuery({
    queryKey: ["resaleMarket", sku, selectedSize, country],
    queryFn: () => fetchResaleMarketPrices(sku, selectedSize, country),
    enabled: sku && selectedSize ? true : false,
  });

  useEffect(() => {
    if (sizes.length) setSelectedSize(sizes[0]);
  }, [sizes]);

  if (status === "pending") return <ResaleMarketLoader />;
  if (status === "error")
    return (
      <>
        <h3 className="mb-8 text-xl font-semibold text-foreground">
          Resale Market Prices
        </h3>
        <div className="text-center font-semibold">{error.message}</div>
      </>
    );

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
