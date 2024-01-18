import InfoBadge from "@/ui/InfoBadge.jsx";
import NotableBadge from "@/ui/NotableBadge.jsx";

export default function ProductItem({ product }) {
  const { name, isPopular, brand, sku, price, time, imageUrl } = product;

  return (
    <li
      id={sku}
      key={sku}
      className="flex cursor-pointer items-center justify-start gap-6 py-4 pl-8 hover:bg-muted/50"
    >
      <img src={imageUrl} alt={name} className="h-14 w-14 rounded-full" />
      <div className="flex flex-col">
        <div className="flex items-center gap-1 text-sm font-semibold">
          <h2 className="line-clamp-1">{name}</h2>
          {isPopular && <NotableBadge size={20} />}
        </div>
        <div className="mb-1 space-x-1">
          <InfoBadge>{brand}</InfoBadge>
          <InfoBadge>{sku}</InfoBadge>
          <InfoBadge>{price}</InfoBadge>
        </div>
        <span className="text-xs text-muted-foreground">{time}</span>
      </div>
    </li>
  );
}
