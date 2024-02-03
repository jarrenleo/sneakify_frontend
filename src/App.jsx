import { GlobalProvider } from "./context/globalContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navigation from "./features/navigation/Navigation";
import Release from "./features/release/Release";
import Detail from "./features/detail/Detail";
import LiveMonitor from "./features/monitor/LiveMonitor";

const queryClient = new QueryClient();

export default function App() {
  return (
    <GlobalProvider>
      <QueryClientProvider client={queryClient}>
        <div className="grid grid-cols-[1fr,3fr,1fr] grid-rows-[5dvh,95dvh] bg-background text-foreground">
          <Navigation />
          <Release />
          <Detail />
          <LiveMonitor />
        </div>
      </QueryClientProvider>
    </GlobalProvider>
  );
}
