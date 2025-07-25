import React, { useState, useRef, useEffect } from 'react';
import { MdSupervisorAccount, MdSearch } from 'react-icons/md';
import { FaRegHeart } from 'react-icons/fa';
import { IoCartOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { useCart } from '../ui/Checkout/CartContext';

function Header() {
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const accountMenuRef = useRef(null);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (accountMenuRef.current && !accountMenuRef.current.contains(event.target)) {
        setShowAccountMenu(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white shadow-md w-full">
      <div className="container mx-auto px-4 py-4">

        {/* Mobile & Tablet: Flex row with logo and icons */}
        <div className="flex justify-between items-center lg:hidden mb-4">
          {/* Logo (left) */}
          <Link to="/">
            <img
              src="https://tunatheme.com/tf/html/fiama-preview/fiama/img/logo.png"
              alt="Fiama Logo"
              className="h-8 object-contain"
            />
          </Link>

          {/* Icons (right) */}
          <div className="flex gap-5 text-2xl text-gray-700">
            <div className="relative" ref={accountMenuRef}>
              <button 
                className="hover:text-[#FF496C] transition" 
                onClick={() => setShowAccountMenu(!showAccountMenu)}
              >
                <MdSupervisorAccount />
              </button>
              
              {/* Account Dropdown Menu */}
              {showAccountMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                  <Link to="/register" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setShowAccountMenu(false)}>
                    Sign Up
                  </Link>
                  <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setShowAccountMenu(false)}>
                    Profile
                  </Link>
                  <Link to="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setShowAccountMenu(false)}>
                    Order List
                  </Link>
                </div>
              )}
            </div>
            <Link to="/cart" className="hover:text-[#FF496C] transition relative">
              <IoCartOutline />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>
            <Link to="/wishlist" className="hover:text-[#FF496C] transition">
              <FaRegHeart />
            </Link>
          </div>
        </div>

        {/* Large Screen Grid */}
        <div className="hidden lg:grid grid-cols-12 gap-4 items-center fixed w-full top-0 left-0 bg-white shadow-md z-50 px-4 py-3">
          {/* Logo */}
          <div className="col-span-3 flex justify-center lg:justify-start">
            <a href="/">
              <img
                src="https://tunatheme.com/tf/html/fiama-preview/fiama/img/logo.png"
                alt="Fiama Logo"
                className="h-7 object-contain"
              />
            </a>
          </div>

          {/* Search */}
          <div className="col-span-6">
            <div className="relative w-full max-w-3xl mx-auto">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
                <MdSearch className="h-5 w-5" />
              </span>
              <input
                type="text"
                placeholder="Search Product, brands and categories"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm 
                           focus:outline-none"
              />
            </div>
          </div>

          {/* Icons */}
          <div className="col-span-3 flex justify-end gap-6 text-2xl text-gray-700">
            <div className="relative" ref={accountMenuRef}>
              <button 
                className="hover:text-[#FF496C] transition" 
                onClick={() => setShowAccountMenu(!showAccountMenu)}
              >
                <MdSupervisorAccount />
              </button>
              
              {/* Account Dropdown Menu */}
              {showAccountMenu && (
                <div className="absolute right-0 lg:mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                  <Link to="/register" className="block px-4 py-2 text-sm text-center bg-[#FF496C] text-white rounded" onClick={() => setShowAccountMenu(false)}>
                    Sign In
                  </Link>

                  <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setShowAccountMenu(false)}>
                    Profile
                  </Link>
                  <Link to="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setShowAccountMenu(false)}>
                    Order List
                  </Link>
                </div>
              )}
            </div>
            <Link to="/cart" className="hover:text-[#FF496C] transition relative">
              <IoCartOutline />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>
            <Link to="/wishlist" className="hover:text-[#FF496C] transition">
              <FaRegHeart />
            </Link>
          </div>
        </div>

        {/* Search for sm/md only */}
        <div className="lg:hidden mt-3">
          <div className="relative w-full">
            <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
              <MdSearch className="h-5 w-5" />
            </span>
            <input
              type="text"
              placeholder="Search Product, brands and categories"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm 
                         focus:outline-none focus:ring-2 focus:ring-[#FF496C]"
            />
          </div>
        </div>

      </div>
    </header>
  );
}

export default Header;
