import ReleaseProducts from "./ReleaseProducts";

export default function Releases() {
  return (
    <section className="flex flex-col border-r border-border">
      <div className="flex items-center justify-between px-8 py-4">
        <h2 className="text-2xl font-bold text-foreground">Releases</h2>
      </div>
      <ReleaseProducts />
    </section>
  );
}
