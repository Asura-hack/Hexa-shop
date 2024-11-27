import { useParams } from 'react-router-dom';
import { useRequest } from 'ahooks';
import { useState, useContext } from 'react';
import { ApplicationContext } from './Layout';
import { FaStar, FaStarHalf, FaRegStar, FaUser } from 'react-icons/fa';
import { useUser } from '@clerk/clerk-react';
import toast from 'react-hot-toast';

export default function ProductInfo() {
  const { id } = useParams();
  const { isSignedIn } = useUser();

  // Fetch product details
  const { data: product, loading } = useRequest(() =>
    fetch(`https://dummyjson.com/products/${id}`).then((res) => res.json())
  );

  // Fetch reviews (using dummy comments as reviews)
  const { data: reviews } = useRequest(() =>
    fetch(`https://dummyjson.com/comments?limit=5`).then((res) => res.json())
  );

  const [quantity, setQuantity] = useState(1);
  const { addToBasket } = useContext(ApplicationContext);

  const increment = () => setQuantity(quantity + 1);
  const decrement = () => setQuantity(quantity > 1 ? quantity - 1 : 1);
  const calculateTotal = () => quantity * product?.price;

  const handleAddToCart = () => {
    console.log('Adding to cart:', {
      id: parseInt(id, 10), // Ensure id is numeric
      quantity,
      price: product?.price,
      name: product?.title,
    });

    addToBasket({
      id: parseInt(id, 10), // Ensure id is numeric
      quantity,
      price: product?.price,
      name: product?.title,
    });
    toast.success(`${product?.title} added to cart`);
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

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Section */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          {product?.images && (
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-full h-[400px] object-contain rounded-lg"
            />
          )}
        </div>

        {/* Product Details Section */}
        <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
          {/* Title and Price */}
          <div className="border-b pb-4">
            <h1 className="text-3xl font-bold mb-2">{product?.title}</h1>
            <p className="text-2xl font-semibold text-gray-500">
              ${product?.price}
            </p>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 pb-4 border-b">
            <div className="font-medium">Rating:</div>
            <div className="flex">{renderRating(product?.rating || 0)}</div>
            <span className="text-sm text-gray-500">({product?.rating})</span>
          </div>

          {/* Description */}
          <div className="border-b pb-4">
            <p className="text-gray-600 leading-relaxed">
              {product?.description}
            </p>
          </div>

          {/* Stock and Brand */}
          <div className="flex justify-between border-b pb-4">
            <div>
              <span className="font-medium">Brand: </span>
              <span className="text-gray-600">{product?.brand}</span>
            </div>
            <div>
              <span className="font-medium">Stock: </span>
              <span
                className={`${
                  product?.stock > 0 ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {product?.stock > 0 ? `${product.stock} units` : 'Out of stock'}
              </span>
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center justify-between border-b pb-4">
            <span className="text-lg font-medium text-gray-700">Quantity:</span>
            <div className="flex items-center border rounded-lg overflow-hidden">
              <button
                onClick={decrement}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                -
              </button>
              <div className="w-16 text-center py-2 font-medium">
                {quantity}
              </div>
              <button
                onClick={increment}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Total and Add to Cart */}
          <div className="space-y-4">
            <div className="text-2xl font-bold text-gray-800">
              Total: ${calculateTotal().toFixed(2)}
            </div>
            {isSignedIn ? (
              <button
                onClick={handleAddToCart}
                disabled={product?.stock === 0}
                className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
                  product?.stock === 0
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {product?.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>
            ) : (
              <div className="text-center text-gray-600">
                Please sign in to add items to cart
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
        <div className="space-y-6">
          {reviews?.comments?.map((review) => (
            <div key={review.id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <FaUser className="text-gray-400 mr-2" />
                <span className="font-medium">{review.user.username}</span>
                <div className="ml-4 flex">
                  {renderRating(Math.random() * 2 + 3)}{' '}
                  {/* Random rating between 3-5 */}
                </div>
              </div>
              <p className="text-gray-600">{review.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
