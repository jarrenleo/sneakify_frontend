/**
 * This components renders a button that toggles the value of 'popularToggle' state.
 * It visually changes its appearance when toggled to indicate whether the filter for popular items is active.
 * @param {boolean} popularToggle - A boolean state indicating if the filter for popular items is currently active.
 * @param {function} setPopularToggle - A function to toggle the 'popularToggle' state.
 * @returns {ReactNode} A react element that renders a button that totggles between display popular or all upcoming products.
 */
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
