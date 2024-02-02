import { useReducer } from "react";
import NavigationBar from "./features/navigation/NavigationBar";
import Releases from "./features/releases/Releases";
import LiveMonitor from "./features/monitor/LiveMonitor";
import MainContent from "./features/content/MainContent";

const currentProduct = {
  channel: null,
  sku: null,
  country: "SG",
};

function reducer(state, action) {
  switch (action.type) {
    case "setCurrentProduct":
      return { ...state, ...action.payload };
    default:
      throw new Error("Invalid action type");
  }
}

export default function App() {
  const [{ channel, sku, country }, dispatch] = useReducer(
    reducer,
    currentProduct,
  );
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return (
    <>
      <div className="grid grid-cols-[1fr,3fr,1fr] grid-rows-[5dvh,95dvh] bg-background text-foreground">
        <NavigationBar dispatch={dispatch} />
        <Releases country={country} timeZone={timeZone} dispatch={dispatch} />
        <MainContent
          channel={channel}
          sku={sku}
          country={country}
          timeZone={timeZone}
        />
        <LiveMonitor />
      </div>
    </>
  );
}
