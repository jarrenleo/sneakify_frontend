export default function LiveStatus({ isLive }) {
  return (
    <div className="flex items-center gap-1">
      <span className="relative h-3 w-3">
        <span
          className={`absolute h-3 w-3 rounded-full transition-colors duration-700 ${
            isLive ? "animate-ping bg-red-600" : "transparent"
          }`}
        ></span>
        <span
          className={`absolute h-2 w-2 translate-x-[25%] translate-y-[25%] rounded-full transition-colors duration-700 ${
            isLive ? "bg-red-600" : "bg-slate-400"
          }`}
        ></span>
      </span>
      <span
        className={`text-sm tracking-wide transition-colors duration-700 ${
          isLive ? "text-red-600" : "text-slate-400"
        }`}
      >
        Live
      </span>
    </div>
  );
}
