import ProductItem from "./ProductItem";

export default function Products({ section, products, setIsLive }) {
  return (
    <div
      onMouseEnter={() => setIsLive(false)}
      onMouseLeave={() => setIsLive(true)}
      className=" scrollbar-primary grow overflow-y-auto"
    >
      {Object.entries(products).map(([date, products]) => {
        return (
          <ul key={date}>
            {section === "releases" && (
              <h2 className="py-4 text-center font-semibold">{date}</h2>
            )}
            {products.map((product) => (
              <ProductItem key={product.sku} product={product} />
            ))}
          </ul>
        );
      })}
    </div>
  );
}
