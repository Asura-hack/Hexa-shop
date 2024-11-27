import ProductCart from "./ProductCart";
import { useRequest } from "ahooks";

export default function ProductList() {
  const { data, loading } = useRequest(() =>
    fetch("https://dummyjson.com/products?limit=20").then((res) => res.json())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          Featured Products
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {data?.products.map(({ title, price, images, id, rating }) => (
            <ProductCart
              name={title}
              price={price}
              url={images[0]}
              id={id}
              rating={rating}
              key={id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
