// src/components/layout/Header.js

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { useCartStore } from "../../store/useCartStore";
import { Button } from "../ui/Button";
import { ShoppingCart, Heart } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";

const Header = ({ onSelectCategory, onSearch }) => {
  const { isAuthenticated, user, logout } = useAuthStore();
  const items = useCartStore((state) => state.items);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-[#27374D] shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link to="/" className="text-3xl font-bold text-[#9DB2BF]">
          ShopKart
        </Link>

        <div className="flex items-center space-x-8">
          <Link
            to="/"
            className="text-[#DDE6ED] hover:text-black-900 flex items-center"
          >
            Products
          </Link>
          <Link
            to="/wishlist"
            className="text-[#DDE6ED] hover:text-black-900 flex items-center"
          >
            <Heart className="h-5 w-5 mr-1" /> Wishlist
          </Link>
          <Link
            to="/cart"
            className="text-[#DDE6ED] hover:text-black-900 flex items-center"
          >
            <ShoppingCart className="h-5 w-5 mr-1" /> Cart ({items.length})
          </Link>
          <Link
            to="/order-history"
            className="text-[#DDE6ED] hover:text-black-900"
          >
            Order History
          </Link>
          {isAuthenticated ? (
            <>
              <Link
                to="/profile"
                className="text-[#DDE6ED] hover:text-gray-900 flex items-center"
              >
                <FontAwesomeIcon icon={faUser} className="mr-1" />
              </Link>
              <span className="text-[#DDE6ED]">Welcome, {user.name}</span>
              <Button
                size="md"
                onClick={handleLogout}
                className="hover:bg-white hover:text-black"
              >
                Logout
              </Button>
            </>
          ) : (
            <div className="text-[#DDE6ED] flex items-center space-x-2">
              <Button
                variant="outline"
                size="md"
                href="/login"
                className="hover:bg-white hover:text-black"
              >
                Login
              </Button>
              <Button
                size="md"
                href="/register"
                className="hover:bg-white hover:text-black"
              >
                Register
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
