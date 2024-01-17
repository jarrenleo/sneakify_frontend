import { Badge, Flame } from "lucide-react";

export default function NotableBadge({ size }) {
  return (
    <div className="relative">
      <Badge
        size={size}
        className="absolute -translate-y-[50%] fill-primary stroke-primary"
      />
      <Flame
        size={(size * 70) / 100}
        className="absolute -translate-y-[50%] translate-x-[22.5%]"
      />
    </div>
  );
}
