import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { FaStar, FaStarHalf, FaRegStar } from "react-icons/fa";
import { useContext } from "react";
import { ApplicationContext } from "./Layout";
import { useUser } from "@clerk/clerk-react";
import toast from "react-hot-toast";

export default function ProductCart({ id, url, name, price, rating }) {
  const { isSignedIn } = useUser();
  const { addToBasket } = useContext(ApplicationContext);

  const handleAddToCart = () => {
    addToBasket({ id, name, price, quantity: 1 });
    toast.success(`${name} added to cart`);
  };

  const renderRating = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<FaStarHalf key="half" className="text-yellow-400" />);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="text-yellow-400" />);
    }

    return stars;
  };

  return (
    <div className="group bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      <div className="relative aspect-w-1 aspect-h-1">
        <img
          src={url}
          alt={name}
          className="w-full h-64 object-cover object-center group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300">
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <Link to={`/product-info/${id}`}>
              <button className="p-3 bg-white rounded-full shadow-lg hover:bg-gray-100 transform hover:scale-110 transition-all duration-300">
                <i className="fa-regular fa-eye text-gray-800"></i>
              </button>
            </Link>
            {isSignedIn && (
              <button
                onClick={handleAddToCart}
                className="p-3 rounded-full shadow-lg transform hover:scale-110 transition-all duration-300 bg-blue-600 hover:bg-blue-700 text-white"
              >
                <i className="fa-solid fa-cart-shopping text-white"></i>
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">
          {name}
        </h3>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-blue-600">${price}</span>
          <div className="flex items-center space-x-2">
            <div className="flex">{renderRating(rating)}</div>
            <span className="text-sm text-gray-600">({rating})</span>
          </div>
        </div>
      </div>
    </div>
  );
}

ProductCart.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  url: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
};
