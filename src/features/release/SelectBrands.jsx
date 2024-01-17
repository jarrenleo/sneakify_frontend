import { useEffect, useRef, useState } from "react";
import { ChevronDown, Check } from "lucide-react";

const brands = ["Nike", "Adidas", "New Balance"];
const initialSelectState = {
  Nike: true,
  Adidas: false,
  "New Balance": false,
};

export default function SelectBrands() {
  const [showOption, setShowOption] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState(initialSelectState);
  const containerRef = useRef();

  useEffect(function () {
    function handleClickOutside(e) {
      if (!containerRef.current.contains(e.target)) setShowOption(false);
    }
    document.addEventListener("click", handleClickOutside);

    return function () {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  function handleCheck(e) {
    const brand = e.currentTarget.id;
    setSelectedBrands((selectedBrands) => ({
      ...selectedBrands,
      [brand]: !selectedBrands[brand],
    }));
  }

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setShowOption(!showOption)}
        className="flex w-28 items-center justify-between gap-2 rounded-md border border-border bg-background py-2 pl-4 pr-3 text-sm font-semibold text-foreground transition-colors hover:bg-border focus:outline-none focus-visible:ring focus-visible:ring-ring"
      >
        <span>Brands</span>
        <ChevronDown
          size="20"
          className={`transition-transform ${showOption && "-rotate-180"}`}
        />
      </button>
      {showOption && (
        <ul className="absolute right-0 mt-1 flex flex-col border border-border bg-background text-sm">
          {brands.map((brand) => (
            <li
              id={brand}
              key={brand}
              onClick={handleCheck}
              className="flex w-32 cursor-pointer items-center gap-2 p-2 font-semibold transition-colors hover:bg-border"
            >
              {selectedBrands[brand] ? (
                <Check size="16" />
              ) : (
                <span className="h-[16px] w-[16px]">&nbsp;</span>
              )}
              <span>{brand}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
