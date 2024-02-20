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
      <div className="flex items-center justify-end gap-4">
        <div className="flex items-center gap-2">
          {!themeSwitch ? <Sun size="16" /> : <Moon size="16" />}
          <Switch checked={themeSwitch} onCheckedChange={setThemeSwitch} />
        </div>
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
