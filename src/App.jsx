import NavigationBar from "./features/navigation/NavigationBar";
import Releases from "./features/release/Releases";
import LiveMonitor from "./features/monitor/LiveMonitor";
import MainContent from "./features/content/MainContent";
import { useEffect, useState } from "react";
import NotSupported from "./ui/NotSupported";

export default function App() {
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  useEffect(function () {
    function handleWindowResize() {
      setViewportWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleWindowResize);

    return function () {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  console.log(viewportWidth);

  return (
    <div>
      {viewportWidth >= 1920 ? (
        <div className="grid grid-cols-[1fr,3fr,1fr] grid-rows-[6dvh,94dvh] bg-background text-foreground">
          <NavigationBar />
          <Releases />
          <MainContent />
          <LiveMonitor />
        </div>
      ) : (
        <NotSupported />
      )}
    </div>
  );
}
