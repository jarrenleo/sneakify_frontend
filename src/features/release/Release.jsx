import { useState } from "react";
import PopularToggle from "./PopularToggle";
import ReleaseProduct from "./ReleaseProduct";

/**
 * This component renders the release section.
 * It displays all upcoming sneaker releases and includes a toggle to filter products by popularity.
 *
 * The component maintains a local state 'popularToggle' to control the filtering of release products based on their popularity. The state is toggled using the 'PopularToggle' component, which can switch the view between all releases and only popular ones.
 *
 * The 'ReleaseProduct' component is responsible for displaying the list of release products according to the current state of 'popularToggle'. When 'popularToggle' is true, only popular release products are displayed; otherwise, all release products are shown.
 *
 * @returns {ReactNode} A react element that renders the release section comprised of a heading, a popular toggle button, and a list of release products.
 */
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
