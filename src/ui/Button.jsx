export default function Button({ styles, children }) {
  return (
    <button
      className={`justify-center gap-1 rounded-md bg-primary px-4 py-2 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground ${styles}`}
    >
      {children}
    </button>
  );
}
