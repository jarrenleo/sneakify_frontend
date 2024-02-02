import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/Select";
import MarketplaceSkeleton from "./MarketplaceSkeleton";
import MarketplaceItem from "./MarketplaceItem";

export default function MarketplaceComparison({ sku, sizes, country }) {
  const [selectedSize, setSelectedSize] = useState(sizes[0]);

  const isReadyToFetch = sku ? true : false;
  const { status, data, error } = useQuery({
    queryKey: ["marketplaceComparison", sku, selectedSize, country],
    queryFn: async function () {
      const response = await fetch(
        `http://localhost:8888/marketplace?sku=${sku}&size=${selectedSize}&country=${country}`,
      );
      if (!response.ok)
        throw Error("Failed to fetch marketplace comparisons ☹");

      return await response.json();
    },
    enabled: isReadyToFetch,
  });

  if (status === "pending") return <MarketplaceSkeleton />;
  if (status === "error")
    return (
      <div className="my-auto text-center font-semibold">{error.message}</div>
    );

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-xl font-semibold text-foreground">
          Marketplace Comparison
        </h3>
        <Select value={selectedSize} onValueChange={setSelectedSize}>
          <SelectTrigger className="w-24">
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
              <td className="px-6">Highest Bid</td>
              <td className="px-6">Fees</td>
              <td className="px-6">Payout</td>
            </tr>
          </thead>
          <tbody className="divide-y divide-border text-sm">
            {data.map((marketplaceInfo) => (
              <MarketplaceItem
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
