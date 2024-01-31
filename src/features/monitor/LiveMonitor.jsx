import { useState } from "react";
import SectionHeader from "@/ui/SectionHeader";
import LiveStatus from "./LiveStatus";
import Products from "@/components/Products";
import { products } from "../../../data/monitorData.js";

export default function LiveMonitor() {
  const [isLive, setIsLive] = useState(true);

  return (
    <section className="flex flex-col border-l border-border">
      <div className="flex items-end justify-between gap-6 px-8 py-4">
        <SectionHeader>Live Monitor</SectionHeader>
        <LiveStatus isLive={isLive} />
      </div>
      {/* <Products section="monitor" products={products} setIsLive={setIsLive} /> */}
    </section>
  );
}
