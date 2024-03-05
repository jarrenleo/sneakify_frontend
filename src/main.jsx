import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

/**
 * Entry point for the React application and responsible for bootstrapping the React application by rendering the root component.
 * StrictMode is a tool for highlighting potential problems in an application, like detecting unexpected side effects and will not be present in production.
 */
ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
