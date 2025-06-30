import React from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/features/cart/cartSlice';

const formatCurrency = (value) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(value);

const PlantCard = ({ plant }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  if (!plant) return <div>Plant data is not available</div>;

  return (
    <div className="rounded-xl shadow-md hover:shadow-lg bg-white transition-all duration-300 overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-start gap-6 p-4">
        {/* Gambar */}
        <div className="w-full sm:w-[220px] aspect-[3/4] rounded-md overflow-hidden">
          <Link to={`/product/${plant._id}`}>
            <img
              src={plant?.coverImage}
              alt={plant?.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </Link>
        </div>

        {/* Konten */}
        <div className="flex-1 space-y-3">
          <Link to={`/product/${plant._id}`}>
            <h3 className="text-xl font-semibold text-gray-800 hover:text-green-600 transition">
              {plant?.title}
            </h3>
          </Link>
          <p className="text-gray-600 text-sm leading-relaxed">
            {plant?.description.length > 80
              ? `${plant.description.slice(0, 80)}...`
              : plant.description}
          </p>

          <div className="text-lg font-semibold text-green-700">
            {formatCurrency(plant?.newPrice)}
            <span className="ml-3 text-gray-400 font-normal line-through text-base">
              {formatCurrency(plant?.oldPrice)}
            </span>
          </div>

          <button
            onClick={() => handleAddToCart(plant)}
            className="mt-2 inline-flex items-center gap-2 px-5 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 transition"
          >
            <FiShoppingCart className="text-lg" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlantCard;
