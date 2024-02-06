import MonitorProduct from "./MonitorProduct";
import Status from "./Status";

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
