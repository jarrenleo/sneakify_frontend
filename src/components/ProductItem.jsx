import { useGlobalState } from "@/context/globalContext";

export default function ProductItem({ productInfo }) {
  const { setProduct } = useGlobalState();
  const { channel, name, isPopular, sku, price, releaseTime, imageUrl } =
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
          {releaseTime} &#10072; {sku}
        </span>
      </div>
    </li>
  );
}
