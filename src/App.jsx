import NavigationBar from "./features/navigation/NavigationBar";
import Releases from "./features/releases/Releases";
import LiveMonitor from "./features/monitor/LiveMonitor";
import MainContent from "./features/content/MainContent";

export default function App() {
  return (
    <>
      <div className="grid grid-cols-[1fr,3fr,1fr] grid-rows-[6dvh,94dvh] bg-background text-foreground">
        <NavigationBar />
        <Releases />
        <MainContent />
        <LiveMonitor />
      </div>
    </>
  );
}
