import Logo from "./Logo";

export default function Navigation() {
  return (
    <nav className="col-span-3 grid grid-cols-3 grid-rows-1 border-b border-border px-6">
      <Logo />
    </nav>
  );
}
