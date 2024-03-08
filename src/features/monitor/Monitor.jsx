import MonitorProduct from "./MonitorProduct";
import Status from "./Status";

/**
 * This component renders the monitor section.
 * It displays the latest sneaker restocks and includes a live status indicator.
 * @returns {ReactNode} A react element that renders the monitor section comprised of a heading, live status indicator and a list of monitor products.
 */
export default function Monitor() {
  return (
    <section className="flex flex-col border-l border-border">
      <div className="flex items-end justify-between px-6 py-3">
        <h2 className="text-2xl font-bold text-foreground">Monitor</h2>
        <Status />
      </div>
      <MonitorProduct />
    </section>
  );
}
