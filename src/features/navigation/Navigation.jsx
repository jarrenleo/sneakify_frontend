import { useEffect, useState } from "react";
import useGlobalState from "@/context/GlobalContext";
import Logo from "./Logo";
import Switch from "@/ui/Switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/Select";
import { Sun, Moon } from "lucide-react";

/**
 * Pre-defined option to value object for the select country dropdown menu component.
 * @property {string} Singapore - The option to select Singapore.
 * @property {string} Malaysia - The option to select Malaysia.
 * @property {string} Japan - The option to select Japan.
 * @property {string} United Kingdom - The option to select United Kingdom.
 * @property {string} Netherlands - The option to select Netherlands.
 * @property {string} Australia - The option to select Australia.
 * @property {string} Canada - The option to select Canada.
 * @property {string} United States - The option to select United States.
 */
const countries = {
  Singapore: "SG",
  Malaysia: "MY",
  Japan: "JP",
  "United Kingdom": "GB",
  Netherlands: "NL",
  Australia: "AU",
  Canada: "CA",
  "United States": "US",
};

/**
 * This component renders the navigation bar containing a logo, a theme toggle switch, and a select country dropdown menu.
 * @returns {ReactNode} A react element that renders the navigation bar containing a logo, a theme toggle switch, and a select country dropdown menu.
 */
export default function Navigation() {
  // Access global state from global context provider
  const { country, darkMode, setCountry, setProduct, setTheme } =
    useGlobalState();
  // State to store the current theme preference
  const [themeSwitch, setThemeSwitch] = useState(darkMode);
  // State to store the current selected country
  const [selectedCountry, setSelectedCountry] = useState(country);

  // When the user selects another country, change the global state by setting the country property to the selected country and resetting the product property
  useEffect(() => {
    if (selectedCountry !== country) {
      setCountry(selectedCountry);
      setProduct(undefined, undefined);
    }
  }, [selectedCountry, country, setCountry, setProduct]);

  // When the user toggles the darkMode switch, change the global state by setting the darkMode property to the preference of the user
  useEffect(() => {
    if (themeSwitch !== darkMode) setTheme(themeSwitch);
  }, [themeSwitch, darkMode, setTheme]);

  // When the user toggles the darkMode switch, also add/remove the dark class onto the html document
  useEffect(() => {
    darkMode
      ? document.documentElement.classList.add("dark")
      : document.documentElement.classList.remove("dark");
  }, [darkMode]);

  return (
    <nav className="col-span-3 flex items-center justify-between border-b border-border px-6">
      <Logo />
      <div className="flex items-center gap-2">
        {!themeSwitch ? <Sun size="16" /> : <Moon size="16" />}
        <Switch
          checked={themeSwitch}
          onCheckedChange={setThemeSwitch}
          className="mr-2"
        />
        <Select value={selectedCountry} onValueChange={setSelectedCountry}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder={selectedCountry} />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(countries).map(([country, countryCode]) => (
              <SelectItem key={countryCode} value={countryCode}>
                {country}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </nav>
  );
}
