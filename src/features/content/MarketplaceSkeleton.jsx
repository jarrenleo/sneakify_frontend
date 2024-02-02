const numOfRows = new Array(3).fill(null);

export default function MarketplaceSkeleton() {
  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-xl font-semibold text-foreground">
          Marketplace Comparison
        </h3>
        <div className="h-10 w-24 animate-pulse rounded-md bg-muted"></div>
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
          <tbody className="animate-pulse divide-y divide-border text-sm">
            {numOfRows.map((row, i) => (
              <tr key={i}>
                <td className="px-6 py-4">
                  <div className="h-5 w-16 rounded-full bg-muted"></div>
                </td>
                <td className="px-6">
                  <div className="h-5 w-10 rounded-full bg-muted"></div>
                </td>
                <td className="px-6">
                  <div className="h-5 w-10 rounded-full bg-muted"></div>
                </td>
                <td className="px-6">
                  <div className="h-5 w-10 rounded-full bg-muted"></div>
                </td>
                <td className="px-6">
                  <div className="h-5 w-10 rounded-full bg-muted"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
