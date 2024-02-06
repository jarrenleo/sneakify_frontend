export default function Status() {
  return (
    <div className="flex items-center gap-1">
      <span className="relative h-3 w-3">
        <span className="absolute h-3 w-3 animate-ping rounded-full bg-red-600 transition-colors duration-700"></span>
        <span className="absolute h-2 w-2 translate-x-[25%] translate-y-[25%] rounded-full bg-red-600 transition-colors duration-700"></span>
      </span>
      <span className="text-sm tracking-wide text-red-600 transition-colors duration-700">
        Live
      </span>
    </div>
  );
}
