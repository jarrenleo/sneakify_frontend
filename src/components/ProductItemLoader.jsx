/**
 * This component renders a skeleton placeholder for a product item in the release/monitor component.
 * @returns {ReactNode} A React element renders a skeleton placeholder for a product item in the release/monitor component.
 */
export default function ProductItemLoader() {
  return (
    <div className="flex items-center gap-4 px-6 py-4">
      <div className="h-14 w-14 rounded-full bg-muted"></div>
      <div className="flex flex-col gap-1">
        <div className="h-3.5 w-60 rounded-md bg-muted"></div>
        <div className="h-3.5 w-10 rounded-md bg-muted"></div>
        <div className="h-3 w-32 rounded-md bg-muted"></div>
      </div>
    </div>
  );
}
