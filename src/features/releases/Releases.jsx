import { useEffect, useState } from "react";
import SectionHeader from "@/ui/SectionHeader";
import Products from "@/components/Products";

export default function Releases() {
  const [products, setProducts] = useState({});

  useEffect(function () {
    (async function () {
      const response = await fetch(
        "https://api.sneakify.org/releases?country=SG&locale=en-SG",
      );
      const data = await response.json();

      setProducts(data);
    })();
  }, []);

  return (
    <section className="flex flex-col border-r border-border">
      <div className="flex items-center justify-between px-8 py-4">
        <SectionHeader>Releases</SectionHeader>
      </div>
      <Products section="releases" products={products} />
    </section>
  );
}
