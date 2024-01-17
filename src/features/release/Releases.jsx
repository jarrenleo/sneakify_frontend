import SectionHeader from "@/ui/SectionHeader";
import SelectBrands from "./SelectBrands";
import Products from "@/components/Products";
import { products } from "../../../data/releaseData.js";

export default function ReleaseOverview() {
  return (
    <section className="flex flex-col border-r border-border">
      <div className="flex items-center justify-between px-8 py-4">
        <SectionHeader>Releases</SectionHeader>
        <SelectBrands />
      </div>
      <Products section="releases" products={products} />
    </section>
  );
}
