import React from 'react';
import { useParams } from 'react-router-dom';
import {} from 'react-icons/fi';
import { getImgUrl } from '../../utils/getImgurl';
import { useFetchPlantByIdQuery } from '../../redux/features/plants/plantsApi';
import { FiShoppingCart } from 'react-icons/fi';
import { addToCart } from '../../redux/features/cart/cartSlice';
import { useDispatch } from 'react-redux';

const SinglePlant = () => {
  const { id } = useParams();
  const { data: plant, isLoading, isError } = useFetchPlantByIdQuery(id);

  const dispatch = useDispatch();

  const formatCurrency = (value) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(value);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error Happening to load plant info</div>;
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl flex flex-col md:flex-row gap-10 mt-10">
      {/* Gambar diperkecil */}
      <div className="w-full md:w-[300px] mx-auto rounded-lg overflow-hidden shadow-sm">
        <img
          src={plant.coverImage}
          alt={plant.title}
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Konten Detail */}
      <div className="flex-1 space-y-5">
        <h1 className="text-3xl font-bold text-gray-800">{plant.title}</h1>

        <div className="text-gray-600 space-y-2 text-sm">
          <p>
            <strong>Author:</strong> {plant.author || 'Admin'}
          </p>
          <p>
            <strong>Published:</strong>{' '}
            {new Date(plant?.createdAt).toLocaleDateString()}
          </p>
          <p>
            <strong>Category:</strong>{' '}
            <span className="capitalize">{plant.category}</span>
          </p>
          <p>
            <strong>Stock:</strong> {plant.stock}
          </p>
        </div>

        <p className="text-gray-700 text-base leading-relaxed">
          {plant.description}
        </p>

        <div className="flex flex-wrap items-center gap-4 mt-4">
          <div className="text-2xl font-semibold text-green-700">
            {formatCurrency(plant?.newPrice)}
            {plant.oldPrice && (
              <span className="ml-3 text-gray-400 line-through text-lg font-normal">
                {formatCurrency(plant?.oldPrice)}
              </span>
            )}
          </div>

          <button
            onClick={() => handleAddToCart(plant)}
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md transition duration-200"
          >
            <FiShoppingCart className="text-lg" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SinglePlant;
