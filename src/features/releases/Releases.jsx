import { useState } from "react";
import PopularToggle from "./PopularToggle";
import ReleaseProducts from "./ReleaseProducts";

export default function Releases({ country, timeZone, dispatch }) {
  const [isPopular, setIsPopular] = useState(false);

  return (
    <section className="flex flex-col border-r border-border">
      <div className="flex items-center justify-between px-6 py-3">
        <h2 className="text-2xl font-bold text-foreground">Releases</h2>
        <PopularToggle isPopular={isPopular} setIsPopular={setIsPopular} />
      </div>
      <ReleaseProducts
        country={country}
        timeZone={timeZone}
        dispatch={dispatch}
        isPopular={isPopular}
      />
    </section>
  );
}
