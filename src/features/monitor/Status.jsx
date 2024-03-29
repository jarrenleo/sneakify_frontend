/**
 * This components renders a status component with a pulsating indicator and a "Live" text.
 * @returns {ReactNode} A react element that renders the live status indicator.
 */
export default function Status() {
  return (
    <div className="flex items-center gap-1">
      <span className="relative h-3 w-3">
        <span className="absolute h-3 w-3 animate-ping rounded-full bg-red-600 transition-colors duration-700"></span>
        <span className="absolute h-2 w-2 translate-x-[25%] translate-y-[25%] rounded-full bg-red-600 transition-colors duration-700"></span>
      </span>
      <span className="text-sm font-semibold tracking-wide text-red-600 transition-colors duration-700">
        Live
      </span>
    </div>
  );
}
