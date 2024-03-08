/**
 * This component renders the Sneakify logo and serves as a navigational element in the application designed to redirect users to the home page when clicked.
 * @returns {ReactNode} A React element that renders the Sneakify logo.
 */
export default function Logo() {
  return (
    <a href="/" className="flex items-center gap-2 text-2xl font-bold">
      <span className="flex size-8 justify-center rounded-md bg-primary leading-7 text-secondary">
        S
      </span>
      <span className="text-primary">Sneakify</span>
    </a>
  );
}
