import { href, Link } from 'react-router-dom';
import { HiBars3CenterLeft } from 'react-icons/hi2';
import { IoSearch } from 'react-icons/io5';
import { HiOutlineUser } from 'react-icons/hi';
import { HiOutlineHeart } from 'react-icons/hi';
import { HiOutlineShoppingCart } from 'react-icons/hi';
import avartarImg from '../assets/avatar.png';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useAuth } from '../context/AuthContext';
const Navbar = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);

  const { currentUser, logout } = useAuth();
  const handleLogOut = () => {
    logout();
  };
  const [isDropdownOpen, setIsDropdownopen] = useState(false);
  const Navigation = [
    {
      name: 'Orders',
      href: '/orders',
    },
    {
      name: 'Cart Page',
      href: '/cart',
    },
    {
      name: 'Check Out',
      href: '/checkout',
    },
  ];
  return (
    <header className="max-w-screen-2xl mx-auto px-4 py-6">
      <nav className="flex justify-between items-center">
        {/*  left side */}
        <div className="flex items-center md:gap-16 gp-4">
          <Link to="/">
            <HiBars3CenterLeft className="size-6" />
          </Link>
          <Link
            to="/products"
            className="hidden sm:inline-block text-sm font-medium hover:underline"
          >
            All Products
          </Link>
          <Link
            to="/search"
            className="hidden sm:inline-block text-sm font-medium hover:underline"
          >
            Search Plants
          </Link>
          <Link
            to="/about"
            className="hidden sm:inline-block text-sm font-medium hover:underline"
          >
           About Us
          </Link>
          <Link
            to="/contact"
            className="hidden sm:inline-block text-sm font-medium hover:underline"
          >
           Contact
          </Link>
        </div>

        {/* right side */}
        <div className="relative flex items-center md:space-x-3 space-x-2">
          <div>
            {currentUser ? (
              <>
                <button onClick={() => setIsDropdownopen(!isDropdownOpen)}>
                  <img
                    src={avartarImg}
                    alt=""
                    className={`size-7 rounded-full ${
                      currentUser ? 'ring-2 ring-blue-500' : ''
                    }`}
                  />
                </button>
                {/* show dropdowns */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-40">
                    <ul className="py-2">
                      {Navigation.map((item) => (
                        <li
                          key={item.name}
                          className="block px-4 py-2 text-sm hover:bg-gray-200"
                          onClick={() => setIsDropdownopen(false)}
                        >
                          <Link to={item.href}>{item.name}</Link>
                        </li>
                      ))}
                      <li>
                        <button
                          onClick={handleLogOut}
                          className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-200"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <Link to="/login">
                <HiOutlineUser className="size-6" />
              </Link>
            )}
          </div>

          <button className="hidden sm:block">
            <HiOutlineHeart className="size-6" />
          </button>
          <Link
            to="/cart"
            className="bg-primary  p-1 sm:px-6 px-2 flex items-center rounded-md"
          >
            <HiOutlineShoppingCart />
            {cartItems.length > 0 ? (
              <span className="tetx-sm font-semibild sm:ml-1">
                {cartItems.length}
              </span>
            ) : (
              <span className="tetx-sm font-semibild sm:ml-1">0</span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
