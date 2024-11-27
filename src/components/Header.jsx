import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import {
  useUser,
  SignInButton,
  SignUpButton,
  useClerk,
} from "@clerk/clerk-react";
import { ApplicationContext } from "./Layout";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isSignedIn } = useUser();
  const { signOut } = useClerk();
  const { basket } = useContext(ApplicationContext);

  const cartItemCount = basket.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleSignOut = () => {
    signOut();
  };

  return (
    <nav className="sticky top-0 flex justify-between items-center px-6 h-20 bg-white shadow-md z-50">
      <Link to="/" className="flex items-center space-x-3">
        <img
          src="https://react18-ecommerce.vercel.app/images/logo.png"
          className="h-12 transition-transform hover:scale-105"
          alt="Logo"
        />
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-6">
        <Link to="/cart/" className="relative group">
          <div className="p-3 rounded-full hover:bg-gray-100 transition-all duration-300">
            <i className="fa-solid fa-cart-shopping text-gray-700 text-xl group-hover:scale-110 transition-transform"></i>
            {cartItemCount > 0 && (
              <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
                {cartItemCount}
              </div>
            )}
          </div>
        </Link>

        {isSignedIn ? (
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">Hello, {user.firstName}</span>
            <button onClick={handleSignOut} className="btn-primary">
              Sign Out
            </button>
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <SignInButton mode="modal">
              <button className="btn-primary">Sign In</button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="btn-primary">Sign Up</button>
            </SignUpButton>
          </div>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <i
          className={`fas ${isOpen ? "fa-times" : "fa-bars"} text-gray-700`}
        ></i>
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-20 right-0 left-0 bg-white shadow-lg py-4 px-6 md:hidden space-y-4">
          <Link
            to="/cart/"
            className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100"
          >
            <div className="relative">
              <i className="fa-solid fa-cart-shopping text-gray-700"></i>
              {cartItemCount > 0 && (
                <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                  {cartItemCount}
                </div>
              )}
            </div>
            <span className="text-gray-700">Cart ({cartItemCount})</span>
          </Link>
          {isSignedIn ? (
            <>
              <span className="block text-gray-700">
                Hello, {user.firstName}
              </span>
              <button onClick={handleSignOut} className="w-full btn-primary">
                Sign Out
              </button>
            </>
          ) : (
            <>
              <SignInButton mode="modal">
                <button className="w-full btn-primary">Sign In</button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="w-full btn-primary">Sign Up</button>
              </SignUpButton>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
