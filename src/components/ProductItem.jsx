import InfoBadge from "@/ui/InfoBadge.jsx";
import NotableBadge from "@/ui/NotableBadge.jsx";

export default function ProductItem({ product }) {
  const { image, name, isNotable, brand, sku, price, time } = product;

  return (
    <li
      id={sku}
      key={sku}
      className="flex cursor-pointer items-center justify-start gap-6 py-4 pl-8 hover:bg-muted/50"
    >
      <img src={image} alt={name} className="h-14 w-14 rounded-full" />
      <div className="flex flex-col">
        <div className="flex items-center gap-1 text-sm font-semibold">
          <h2>{name}</h2>
          {isNotable && <NotableBadge size={20} />}
        </div>
        <div className="mb-1 space-x-1">
          <InfoBadge>{brand}</InfoBadge>
          <InfoBadge>{sku}</InfoBadge>
          <InfoBadge>{price}</InfoBadge>
        </div>
        <span className="text-muted-foreground text-xs">{time}</span>
      </div>
    </li>
  );
}
