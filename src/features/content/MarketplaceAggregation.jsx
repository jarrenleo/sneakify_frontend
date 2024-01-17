export default function MarketplaceAggregation({ marketplaces }) {
  let bestLowestAsk = Infinity;
  let bestHighestBid = -Infinity;
  let bestFees = Infinity;
  let bestPayout = -Infinity;

  Object.values(marketplaces).forEach((price) => {
    if (price.lowestAsk < bestLowestAsk) bestLowestAsk = price.lowestAsk;
    if (price.highestBid > bestHighestBid) bestHighestBid = price.highestBid;
    if (price.fees < bestFees) bestFees = price.fees;
    if (price.payout > bestPayout) bestPayout = price.payout;
  });

  return (
    <div className="rounded-md border border-border p-8">
      <h3 className="mb-6 text-2xl font-semibold text-foreground">
        Marketplace Aggregation
      </h3>
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
            {Object.entries(marketplaces).map(([key, value]) => {
              const { lowestAsk, highestBid, fees, payout, icon, url } = value;
              return (
                <tr key={key} className="hover:bg-muted/50">
                  <td className="px-6 py-4">
                    <a
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 hover:underline"
                    >
                      <img src={icon} className="h-6 w-6" />
                      <span>{key}</span>
                    </a>
                  </td>
                  <td
                    className={`px-6 ${
                      bestLowestAsk === lowestAsk && "text-emerald-500"
                    }`}
                  >
                    SGD {lowestAsk}
                  </td>
                  <td
                    className={`px-6 ${
                      bestHighestBid === highestBid && "text-emerald-500"
                    }`}
                  >
                    SGD {highestBid}
                  </td>
                  <td
                    className={`px-6 ${
                      bestFees === fees && "text-emerald-500"
                    }`}
                  >
                    {fees}%
                  </td>
                  <td
                    className={`px-6 ${
                      bestPayout === payout && "text-emerald-500"
                    }`}
                  >
                    SGD {payout}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
