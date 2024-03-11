import { useState, useEffect, useRef, forwardRef } from "react";
import ProductItem from "@/components/ProductItem";
import useGlobalState from "@/context/GlobalContext";
import { useQuery } from "@tanstack/react-query";
import MonitorLoader from "./MonitorLoader";
import FlipMove from "react-flip-move";

/**
 * Fetches monitor product data from our API endpoint.
 * @async
 * @function fetchMonitorProduct
 * @param {string} country - The selected country.
 * @param {string} timeZone - The current timeZone.
 * @returns {Promise<Object[]>} A promise that resolves to an array of monitor products.
 * @throws {Error} Throws an error if the data fetching process fails.
 */
async function fetchMonitorProduct(country, timeZone) {
  const response = await fetch(
    `https://api.sneakify.org/monitor?country=${country}&timeZone=${timeZone}`,
  );
  if (!response.ok) throw new Error("Something went wrong ☹");

  return await response.json();
}

/**
 * A forwardRef component that renders the monitor product item.
 * @param {Object} productInfo - The product information.
 * @param {React.Ref} ref - The ref forwarded to the component.
 * @returns {ReactNode} A react element that renders a monitor product item.
 */
const MonitorRef = forwardRef(function MonitorRef({ productInfo }, ref) {
  return (
    <ul ref={ref}>
      <ProductItem key={productInfo.uuid} productInfo={productInfo} />
    </ul>
  );
});

/**
 * This component fetches and renders a list of monitor products.
 * This component also handles loading states and errors, displaying appropriate messages.
 * @returns {ReactNode} A React element that renders a list of monitor products.
 */
export default function MonitorProduct() {
  // Access global state from global context provider
  const { country, timeZone } = useGlobalState();
  // State to hold the list of monitor products
  const [products, setProducts] = useState([]);
  // useRef to keep track of previous data fetched
  const previousDataRef = useRef();

  // Fetch monitor data at a 6 secs interval using React query based on country and timeZone
  const { status, data, error } = useQuery({
    queryKey: ["monitorProduct", country],
    queryFn: () => fetchMonitorProduct(country, timeZone),
    refetchInterval: 6000,
    staleTime: Infinity,
  });

  // When the country changes, reset the list of monitor products and previous data reference
  useEffect(() => {
    setProducts([]);
    previousDataRef.current = undefined;
  }, [country]);

  // When the status or data changes (data refetched), compare the latest product of the previous data against the current data
  // If they are different, new products have been restocked, and therefore, we update the product list and set the latest product of the current data as the previous data reference.
  useEffect(() => {
    if (status !== "success") return;

    const previousFetchTime = previousDataRef.current?.lastFetchTime;
    const previousSku = previousDataRef.current?.sku;
    const currentFetchTime = data[0].dateTimeObject;
    const currentSku = data[0].sku;
    if (
      !previousDataRef.current ||
      (previousFetchTime !== currentFetchTime && previousSku !== currentSku)
    ) {
      const previousIndex = data.findIndex(
        (productInfo) =>
          previousFetchTime === productInfo.dateTimeObject &&
          previousSku === productInfo.sku,
      );
      const newProducts =
        previousIndex !== 1 ? data.slice(0, previousIndex) : data;

      setProducts((previousProducts) => [...newProducts, ...previousProducts]);
    }

    previousDataRef.current = {
      lastFetchTime: currentFetchTime,
      sku: currentSku,
    };
  }, [status, data]);

  // If pending status, render skeleton loader
  if (status === "pending") return <MonitorLoader />;
  // If error status, render error message
  if (status === "error")
    return <div className="text-center font-semibold">{error.message}</div>;

  // If success status, render the list of monitor products
  // FlipMove animation library is used to smoothly animate the addition of new product restocks
  return (
    <div className="scrollbar-primary overflow-y-auto">
      <FlipMove
        duration={700}
        appearAnimation="none"
        enterAnimation="fade"
        leaveAnimation="none"
      >
        {products.map((productInfo) => (
          <MonitorRef key={productInfo.uuid} productInfo={productInfo} />
        ))}
      </FlipMove>
    </div>
  );
}
