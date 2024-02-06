import { useEffect, useState } from "react";
import useGlobalState from "@/context/globalContext";
import Logo from "./Logo";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/Select";
import SearchBar from "./SearchBar";

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
  const { country, setCountry, setProduct } = useGlobalState();
  const [selectedCountry, setSelectedCountry] = useState(country);

  useEffect(() => {
    if (selectedCountry !== country) {
      localStorage.setItem("country", JSON.stringify(selectedCountry));
      setCountry(selectedCountry);
      setProduct(undefined, undefined);
    }
  }, [selectedCountry, country, setCountry, setProduct]);

  return (
    <nav className="col-span-3 grid grid-cols-3 grid-rows-1 border-b border-border px-6">
      <Logo />
      <SearchBar />
      <div className="flex items-center justify-end">
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
