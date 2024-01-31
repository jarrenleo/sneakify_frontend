import { Flame } from "lucide-react";

export default function PopularBadge({ size }) {
  return <Flame size={(size * 70) / 100} className="fill-foreground" />;
}
