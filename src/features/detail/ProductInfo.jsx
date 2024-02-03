import { useEffect } from "react";
import { useGlobalState } from "@/context/globalContext";
import { useQuery } from "@tanstack/react-query";
import ProductInfoLoader from "./ProductInfoLoader";

async function getProductInfo(channel, sku, country, timeZone) {
  const response = await fetch(
    `http://localhost:8888/product?channel=${channel}&sku=${sku}&country=${country}&timeZone=${timeZone}`,
  );
  if (!response.ok) throw new Error("Something went wrong ☹");

  return await response.json();
}

export default function ProductInfo({ setSizes, setQuery }) {
  const { country, channel, sku, timeZone } = useGlobalState();
  const { status, data, error } = useQuery({
    queryKey: ["productInfo", channel, sku, country, timeZone],
    queryFn: () => getProductInfo(channel, sku, country, timeZone),
    enabled: channel && sku ? true : false,
  });

  useEffect(
    function () {
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
    },
    [channel, status, data, setSizes, setQuery],
  );

  if (status === "pending") return <ProductInfoLoader />;
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
