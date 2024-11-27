import PropTypes from "prop-types";
import { useContext } from "react";
import { ApplicationContext } from "./Layout";

export default function Cart({ id, url, name, price, quantity, onRemove }) {
  const { updateBasketItem } = useContext(ApplicationContext);

  const handleQuantityChange = (change) => {
    const newQuantity = Math.max(1, quantity + change);
    if (newQuantity === 0) {
      onRemove(id);
    } else {
      updateBasketItem(id, newQuantity);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center p-6">
        <div className="h-24 w-24 flex-shrink-0">
          <img
            src={url}
            alt={name}
            className="h-full w-full object-cover rounded-lg"
          />
        </div>
        <div className="ml-6 flex-1">
          <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
          <p className="text-2xl font-bold text-blue-600 mt-1">${price}</p>
          <p className="text-gray-500 mt-1">
            Total: ${(price * quantity).toFixed(2)}
          </p>
        </div>
        <div className="ml-6 flex flex-col items-end space-y-4">
          <div className="flex items-center space-x-3 bg-gray-100 rounded-lg p-2">
            <button
              onClick={() => handleQuantityChange(-1)}
              className={`w-8 h-8 flex items-center justify-center rounded-full bg-white shadow transition-colors ${
                quantity <= 1
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-50"
              }`}
              disabled={quantity <= 1}
            >
              <i className="fas fa-minus text-sm text-gray-600"></i>
            </button>
            <span className="text-lg font-medium w-8 text-center">
              {quantity}
            </span>
            <button
              onClick={() => handleQuantityChange(1)}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow hover:bg-gray-50 transition-colors"
            >
              <i className="fas fa-plus text-sm text-gray-600"></i>
            </button>
          </div>
          <button
            onClick={() => onRemove(id)}
            className="text-red-500 hover:text-red-700 transition-colors flex items-center"
          >
            <i className="fas fa-trash-alt mr-2"></i>
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

Cart.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  url: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  onRemove: PropTypes.func.isRequired,
};
