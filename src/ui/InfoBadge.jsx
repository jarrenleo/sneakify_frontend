export default function InfoBadge({ children }) {
  return (
    <span className="rounded-sm bg-primary/25 px-1 text-xs text-primary">
      {children}
    </span>
  );
}
