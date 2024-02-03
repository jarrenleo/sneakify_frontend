export default function PopularToggle({ popularToggle, setPopularToggle }) {
  return (
    <button
      className={`rounded-md border border-border px-2 py-1 text-xs outline-none focus-visible:ring focus-visible:ring-ring ${
        popularToggle && "border-primary text-primary"
      }`}
      onClick={() => setPopularToggle(!popularToggle)}
    >
      Popular
    </button>
  );
}
