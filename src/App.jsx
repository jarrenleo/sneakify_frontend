import { useEffect } from "react";
import useGlobalState from "./context/globalContext";
import Navigation from "./features/navigation/Navigation";
import Release from "./features/release/Release";
import Detail from "./features/detail/Detail";
import Monitor from "./features/monitor/Monitor";

export default function App() {
  const { darkMode } = useGlobalState();

  useEffect(() => {
    darkMode
      ? document.documentElement.classList.add("dark")
      : document.documentElement.classList.remove("dark");
  }, [darkMode]);

  return (
    <div className="grid grid-cols-[25dvw,1fr,25dvw] grid-rows-[5dvh,95dvh] bg-background text-foreground 2xl:grid-cols-[1fr,3fr,1fr]">
      <Navigation />
      <Release />
      <Detail />
      <Monitor />
    </div>
  );
}
