import PopularBadge from "@/ui/PopularBadge";
import { Badge } from "lucide-react";

export default function ProductInfo({ product }) {
  const {
    image,
    name,
    isNotable,
    url,
    colour,
    description,
    method,
    quantity,
    price,
    sku,
    dateTime,
    sizesAndStockLevels,
    lastUpdated,
  } = product;

  return (
    <div className="rounded-md border border-border p-8 text-card-foreground">
      <div className="mb-2 flex items-center">
        <img src={image} alt={name} className="h-24 w-24 rounded-full" />
        <div className="flex flex-col space-y-2 p-6">
          <div className="flex items-center gap-2">
            <h3 className="text-2xl font-semibold leading-none">{name}</h3>
            {isNotable && <PopularBadge size={32} />}
          </div>

          <p className="text-sm text-muted-foreground">{colour}</p>
          <div className="flex gap-1">
            <Badge className="stroke-muted-foreground" />
            <Badge className="stroke-muted-foreground" />
            <Badge className="stroke-muted-foreground" />
          </div>
        </div>
      </div>
      <div>
        <p className="mb-8 text-sm text-card-foreground">{description}</p>
        <div className="mb-6 flex items-center justify-between">
          <span className="text-xl font-semibold">{price}</span>
          <div className="flex items-center gap-1">
            <div className="items-center rounded-full border border-transparent bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground">
              {method}
            </div>
            <div className="items-center rounded-full border border-transparent bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground">
              {quantity} item(s) per checkout
            </div>
          </div>
        </div>
        <div>
          <div className="mb-2 text-xs text-muted-foreground">
            Available Sizes & Stock Levels
          </div>
          <table className="mb-8 w-3/4">
            <thead className="text-left">
              <tr>
                <th className="text-sm text-muted-foreground">Sizes</th>
                <th className="text-sm text-muted-foreground">Stock Levels</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(sizesAndStockLevels).map(([size, stockLevel]) => (
                <tr key={size}>
                  <td>
                    <span className="rounded-full border border-transparent bg-primary px-2.5 py-0.5 text-xs font-semibold text-primary-foreground">
                      US {size}
                    </span>
                  </td>
                  <td>
                    <span className="rounded-full border border-transparent bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground">
                      {stockLevel}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mb-1 text-xs text-muted-foreground">
          Release Date: {dateTime}
        </div>
        <div className="mb-8 text-xs text-muted-foreground">
          Style Colour: {sku}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="text-xs text-muted-foreground">
          Last updated: {lastUpdated}
        </div>
        <a
          className="items-center justify-center rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground ring-offset-background transition-colors hover:bg-secondary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          href={url}
          target="_blank"
          rel="noreferrer"
        >
          View
        </a>
      </div>
    </div>
  );
}
