import { createContext, useContext, useReducer } from "react";

const GlobalContext = createContext();

/**
 * Retrieves the system color scheme preference.
 * @function getSystemPreference
 * @returns {boolean} true if the system prefers dark mode, false otherwise.
 */
function getSystemPreference() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

/**
 * Retrieves a value from the local storage.
 * @function getLocalStorage
 * @param {string} key - The key to retrieve from the local storage
 * @param {string | boolean} defaultValue - The default value to return if the key is not found.
 * @returns {string | boolean} The value retrieved from the local storage or the default value.
 */
function getLocalStorage(key, defaultValue) {
  const storedValue = localStorage.getItem(key);
  return storedValue ? JSON.parse(storedValue) : defaultValue;
}

/**
 * Sets a value in the local storage.
 * @function setLocalStorage
 * @param {string} key - The key to set in the local storage.
 * @param {string | boolean} value - The value to store in the local storage.
 */
function setLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

/**
 * Initial global state object.
 * @type {Object.<string, string | boolean>}
 * @property {string} country = The selected country to display.
 * @property {string} channel - The selected product channel to display.
 * @property {string} sku - The selected product stock keeping unit to display.
 * @property {string} timeZone - The user's time zone.
 * @property {string} darkMode - The selected theme to display.
 */
const initialState = {
  country: getLocalStorage("country", "SG"),
  channel: undefined,
  sku: undefined,
  timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  darkMode: getLocalStorage("darkMode", getSystemPreference()),
};

/**
 * Reducer function to manipulate the global state.
 * @function reducer
 * @param {Object} state - The current state.
 * @param {Object} action - The action to perform.
 * @returns {Object} The new state after applying the action.
 * @throws {Error} Throws an error if an invalid action type is provided.
 */
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

/**
 * The global context provider component.
 * @param {ReactNode} children - The child components to be wrapped by the provider.
 * @returns {ReactNode} - The entire React application wrapped within the global context provider component.
 */
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

  function setTheme(selectedMode) {
    dispatch({
      type: "setTheme",
      payload: selectedMode,
    });
    setLocalStorage("darkMode", selectedMode);
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

/**
 * Custom hook for components to access the global state.
 * @returns {Object} The global state and setter functions.
 */
export default function useGlobalState() {
  return useContext(GlobalContext);
}
