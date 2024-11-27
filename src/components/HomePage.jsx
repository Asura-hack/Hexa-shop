import ProductList from "./ProductList";
import bgImage from "../data/bg.jpg";
import { useRef } from "react";

function HomePage() {
  const productListRef = useRef(null);

  const handleShopNowClick = () => {
    productListRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div
        className="relative h-[500px] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl font-bold mb-4">Welcome to Our Store</h1>
          <p className="text-xl mb-8">
            Discover amazing products at great prices
          </p>
          <button className="btn-primary text-lg" onClick={handleShopNowClick}>
            Shop Now
          </button>
        </div>
      </div>

      {/* Featured Products Section */}
      <div ref={productListRef}>
        <ProductList />
      </div>
    </div>
  );
}

export default HomePage;
