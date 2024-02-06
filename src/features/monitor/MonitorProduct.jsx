import { useState, useEffect, useRef, forwardRef } from "react";
import ProductItem from "@/components/ProductItem";
import useGlobalState from "@/context/globalContext";
import { useQuery } from "@tanstack/react-query";
import MonitorLoader from "./MonitorLoader";
import FlipMove from "react-flip-move";

async function fetchMonitorProduct(country, timeZone) {
  const response = await fetch(
    `http://localhost:8888/monitor?country=${country}&timeZone=${timeZone}`,
  );
  if (!response.ok) throw new Error("Something went wrong ☹");

  return await response.json();
}

const MonitorRef = forwardRef(function MonitorRef({ productInfo }, ref) {
  return (
    <div ref={ref}>
      <ProductItem
        key={productInfo.sku + productInfo.dateTimeObject}
        productInfo={productInfo}
      />
    </div>
  );
});

export default function MonitorProduct() {
  const { country, timeZone } = useGlobalState();
  const [products, setProducts] = useState([]);
  const previousDataRef = useRef();

  const { status, data, error } = useQuery({
    queryKey: ["monitorProduct", country],
    queryFn: () => fetchMonitorProduct(country, timeZone),
    refetchInterval: 5000,
    staleTime: Infinity,
  });

  useEffect(() => {
    setProducts([]);
    previousDataRef.current = undefined;
  }, [country]);

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

  if (status === "pending") return <MonitorLoader />;
  if (status === "error")
    return <div className="text-center font-semibold">{error.message}</div>;

  return (
    <div className="scrollbar-primary overflow-y-auto">
      <FlipMove>
        {products.map((productInfo) => (
          <MonitorRef
            key={productInfo.sku + productInfo.dateTimeObject}
            productInfo={productInfo}
          />
        ))}
      </FlipMove>
    </div>
  );
}
