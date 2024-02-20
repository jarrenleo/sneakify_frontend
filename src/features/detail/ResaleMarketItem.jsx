export default function ResaleMarketItem({ marketplaceInfo }) {
  const {
    marketplace,
    lowestAsk,
    lastSale,
    fees,
    payout,
    iconUrl,
    productUrl,
  } = marketplaceInfo;

  return (
    <tr className="hover:bg-muted/50">
      <td className="px-6 py-4">
        <a
          href={productUrl}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 hover:underline"
        >
          <img src={iconUrl} alt={`${marketplace} Icon`} className="h-6 w-6" />
          <span>{marketplace}</span>
        </a>
      </td>
      <td className="px-6">{lowestAsk}</td>
      <td className="px-6">{lastSale}</td>
      <td className="px-6">{fees}</td>
      <td className="px-6">{payout}</td>
    </tr>
  );
}
