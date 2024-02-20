import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GlobalContextProvider } from "./context/GlobalContext";
import Navigation from "./features/navigation/Navigation";
import Release from "./features/release/Release";
import Detail from "./features/detail/Detail";
import Monitor from "./features/monitor/Monitor";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalContextProvider>
        <div className="grid grid-cols-[25dvw,1fr,25dvw] grid-rows-[5dvh,95dvh] bg-background text-foreground 2xl:grid-cols-[1fr,3fr,1fr]">
          <Navigation />
          <Release />
          <Detail />
          <Monitor />
        </div>
      </GlobalContextProvider>
    </QueryClientProvider>
  );
}
