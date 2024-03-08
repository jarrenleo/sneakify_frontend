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
 * This component renders the navigation bar.
 * It contains a logo component, a theme toggle switch that switches between light and dark modes, and a select dropdown menu to choose a country from a predefined list.
 *
 * This component interacts with a global state to manage and apply user preferences across the application.
 * Changes to theme and country selection are stored and reflected in global context, ensuring a consistent experience throughout the user's session.
 *
 * useEffect hooks are used to perform side effects tied to the theme mode and country selection state changes. Updates to these states are propagated to corresponding context setters to maintain application-wide state consistency.
 *
 * @returns {ReactNode} A react element that renders the navigation bar comprising a Logo, a theme Switch, and a country selection menu.
 */
export default function Navigation() {
  const { country, darkMode, setCountry, setProduct, setTheme } =
    useGlobalState();
  const [themeSwitch, setThemeSwitch] = useState(darkMode);
  const [selectedCountry, setSelectedCountry] = useState(country);

  useEffect(() => {
    if (selectedCountry !== country) {
      setCountry(selectedCountry);
      setProduct(undefined, undefined);
    }
  }, [selectedCountry, country, setCountry, setProduct]);

  useEffect(() => {
    if (themeSwitch !== darkMode) setTheme(themeSwitch);
  }, [themeSwitch, darkMode, setTheme]);

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
