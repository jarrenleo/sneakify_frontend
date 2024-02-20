import { createContext, useContext, useReducer } from "react";

const GlobalContext = createContext();

function getSystemPreference() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function getLocalStorage(key, defaultValue) {
  const storedValue = localStorage.getItem(key);
  return storedValue ? JSON.parse(storedValue) : defaultValue;
}

function setLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

const initialState = {
  country: getLocalStorage("country", "SG"),
  channel: undefined,
  sku: undefined,
  timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  darkMode: getLocalStorage("darkMode", getSystemPreference()),
};

function reducer(state, action) {
  switch (action.type) {
    case "setCountry":
      return { ...state, country: action.payload };
    case "setProduct":
      return { ...state, ...action.payload };
    case "setTheme":
      return { ...state, darkMode: action.payload };
    default:
      throw new Error("Invalid action type");
  }
}

export function GlobalContextProvider({ children }) {
  const [{ country, channel, sku, timeZone, darkMode }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  function setCountry(country) {
    dispatch({ type: "setCountry", payload: country });
    setLocalStorage("country", country);
  }

  function setProduct(channel, sku) {
    dispatch({
      type: "setProduct",
      payload: {
        channel,
        sku,
      },
    });
  }

  function setTheme(darkMode) {
    dispatch({
      type: "setTheme",
      payload: darkMode,
    });
    setLocalStorage("darkMode", darkMode);
  }

  return (
    <GlobalContext.Provider
      value={{
        country,
        channel,
        sku,
        timeZone,
        darkMode,
        setCountry,
        setProduct,
        setTheme,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export default function useGlobalState() {
  return useContext(GlobalContext);
}
