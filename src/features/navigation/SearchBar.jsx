import { useEffect, useRef, useState } from "react";
import { Search, SquareSlash, X } from "lucide-react";

export default function SearchBar() {
  const [input, setInput] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const inputRef = useRef(null);

  function handleReset() {
    setInput("");
    inputRef.current.focus();
  }

  useEffect(function () {
    function handleKeydown(e) {
      if (e.key === "/") inputRef.current.focus();
    }
    document.addEventListener("keydown", handleKeydown);

    return function () {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, []);

  return (
    <search className="flex items-center justify-center">
      <form
        className={`flex items-center gap-3 rounded-md bg-input px-3 py-2 transition-colors ${
          isFocus && "ring-2 ring-ring"
        }`}
      >
        <Search className="stroke-muted-foreground" />
        {/** Add result list on input */}
        <input
          type="text"
          placeholder="Search sneakers"
          value={input}
          ref={inputRef}
          onChange={(e) => setInput(e.target.value)}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          className="rounded-medium w-96 bg-input placeholder:text-muted-foreground focus:outline-none"
        />
        {!input ? (
          <SquareSlash className="stroke-muted-foreground" />
        ) : (
          <X
            onClick={handleReset}
            className="stroke-muted-foreground hover:cursor-pointer"
          />
        )}
      </form>
    </search>
  );
}
