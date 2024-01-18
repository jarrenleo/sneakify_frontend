import Logo from "./Logo";
import SearchBar from "./SearchBar";
import Settings from "./Settings";

export default function NavigationBar() {
  return (
    <nav className="col-span-3 grid grid-cols-3 grid-rows-1 border-b border-border">
      <Logo />
      <SearchBar />
      <Settings />
    </nav>
  );
}
