export default function PopularToggle({ isPopular, setIsPopular }) {
  return (
    <button
      className={`rounded-md border border-border px-2 py-1 text-xs outline-none focus-visible:ring focus-visible:ring-ring ${
        isPopular && "border-primary text-primary"
      }`}
      onClick={() => setIsPopular(!isPopular)}
    >
      Popular
    </button>
  );
}
