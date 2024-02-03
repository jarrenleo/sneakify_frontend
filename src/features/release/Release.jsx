import { useState } from "react";
import PopularToggle from "./PopularToggle";
import ReleaseProduct from "./ReleaseProduct";

export default function Release() {
  const [popularToggle, setPopularToggle] = useState(false);

  return (
    <section className="flex flex-col border-r border-border">
      <div className="flex items-center justify-between px-6 py-3">
        <h2 className="text-2xl font-bold text-foreground">Releases</h2>
        <PopularToggle
          popularToggle={popularToggle}
          setPopularToggle={setPopularToggle}
        />
      </div>
      <ReleaseProduct popularToggle={popularToggle} />
    </section>
  );
}
