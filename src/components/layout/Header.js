import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { useCartStore } from "../../store/useCartStore";
import { Button } from "../ui/Button";
import { ShoppingCart, Heart } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBars } from "@fortawesome/free-solid-svg-icons";

const Header = ({ onSelectCategory, onSearch }) => {
  const { isAuthenticated, user, logout } = useAuthStore();
  const items = useCartStore((state) => state.items);
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const username = localStorage.getItem('name') || 'Guest';
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-[#27374D] shadow-md flex flex-col md:flex-row justify-between items-center p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-3xl font-bold text-[#9DB2BF]">
          ShopKart
        </Link>
        <button
          className="md:hidden text-[#DDE6ED]"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <FontAwesomeIcon icon={faBars} className="h-6 w-6" />
        </button>
        <div className={`flex-col md:flex-row md:flex ${isMobileMenuOpen ? "flex" : "hidden"} md:space-x-4 lg:space-x-6 bg-[#27374D] md:bg-transparent p-4 md:p-2 rounded md:rounded-none shadow-md md:shadow-none`}>
          <ul className="flex flex-col md:flex-row list-none items-center md:space-x-2 lg:space-x-4">
            <li>
              <Link to="/" className="text-[#DDE6ED] hover:text-black-900 flex items-center py-2 md:py-0">
                Products
              </Link>
            </li>
            <li>
              <Link to="/wishlist" className="text-[#DDE6ED] hover:text-black-900 flex items-center py-2 md:py-0">
                <Heart className="h-5 w-5 mr-1" /> Wishlist
              </Link>
            </li>
            <li>
              <Link to="/cart" className="text-[#DDE6ED] hover:text-black-900 flex items-center py-2 md:py-0">
                <ShoppingCart className="h-5 w-5 mr-1" /> Cart ({items.length})
              </Link>
            </li>
            <li>
              <Link to="/orders" className="text-[#DDE6ED] hover:text-black-900 py-2 md:py-0">
                Orders
              </Link>
            </li>
            {isAuthenticated ? (
              <>
                <li>
                  <Link to="/profile" className="text-[#DDE6ED] hover:text-gray-900 flex items-center py-2 md:py-0">
                    <FontAwesomeIcon icon={faUser} className="mr-1" />
                  </Link>
                </li>
                <li>
                <span className="text-[#DDE6ED] py-2 md:py-0">Welcome, <span className="font-bold text-accent-color">{username}</span></span>
                </li>
                <li>
                  <Button size="md" onClick={handleLogout} className="hover:bg-white hover:text-black py-2 md:py-0">
                    Logout
                  </Button>
                </li>
              </>
            ) : (
              <div className="text-[#DDE6ED] flex flex-col md:flex-row items-center space-x-0 md:space-x-2">
                <li>
                  <Button variant="outline" size="md" href="/login" className="hover:bg-white hover:text-black py-2 md:py-0">
                    Login
                  </Button>
                </li>
                <li>
                  <Button size="md" href="/register" className="hover:bg-white hover:text-black py-2 md:py-0">
                    Register
                  </Button>
                </li>
              </div>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;