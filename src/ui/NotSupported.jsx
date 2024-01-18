export default function NotSupported() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2 bg-background px-12 text-xl font-semibold text-foreground">
      <span className="text-center">
        Sneakify currently does not support mobile viewports. Please use a
        desktop with a resolution of at least 1080p.
      </span>
    </div>
  );
}
