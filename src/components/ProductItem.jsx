import useGlobalState from "@/context/GlobalContext";

/**
 * This component renders a single product item in a list.
 * This component has an onClick handler that changes the current product to display.
 * @param {Object} productInfo - The product information.
 * @returns {ReactNode} A react element that renders a single product item in a list.
 */
export default function ProductItem({ productInfo }) {
  const { setProduct } = useGlobalState();
  const { channel, name, sku, price, releaseTime, lastFetchTime, imageUrl } =
    productInfo;

  return (
    <li
      className="flex cursor-pointer items-center justify-start gap-4 px-6 py-4 hover:bg-muted/50"
      onClick={() => setProduct(channel, sku)}
    >
      <img src={imageUrl} alt={name} className="h-14 w-14 rounded-full" />
      <div className="flex flex-col gap-0.5">
        <h3 className="line-clamp-1 text-sm font-semibold">{name}</h3>
        <span className="text-sm">{price}</span>
        <span className="text-xs text-muted-foreground">
          {releaseTime || lastFetchTime} &#10072; {sku}
        </span>
      </div>
    </li>
  );
}
