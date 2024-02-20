import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GlobalContextProvider } from "./context/globalContext";
import App from "./App.jsx";
import "./index.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <GlobalContextProvider>
        <App />
      </GlobalContextProvider>
    </QueryClientProvider>
  </StrictMode>,
);
