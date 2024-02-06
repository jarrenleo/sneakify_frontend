import { createContext, useContext, useReducer } from "react";

const GlobalContext = createContext();

function getLocalStorage(key, defaultValue) {
  const storedValue = localStorage.getItem(key);
  return storedValue ? JSON.parse(storedValue) : defaultValue;
}

const initialState = {
  country: getLocalStorage("country", "SG"),
  channel: undefined,
  sku: undefined,
  timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
};

function reducer(state, action) {
  switch (action.type) {
    case "setCountry":
      return { ...state, country: action.payload };
    case "setProduct":
      return { ...state, ...action.payload };
    default:
      throw new Error("Invalid action type");
  }
}

export function GlobalProvider({ children }) {
  const [{ country, channel, sku, timeZone }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  function setCountry(country) {
    dispatch({ type: "setCountry", payload: country });
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

  return (
    <GlobalContext.Provider
      value={{
        country,
        channel,
        sku,
        timeZone,
        setCountry,
        setProduct,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export default function useGlobalState() {
  return useContext(GlobalContext);
}
