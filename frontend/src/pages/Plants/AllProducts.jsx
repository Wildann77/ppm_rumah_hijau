import React, { useState } from 'react';
import { useFetchAllPlantsQuery } from '../../redux/features/plants/plantsApi';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/features/cart/cartSlice';
import { Link } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';
import ReactPaginate from 'react-paginate';

const AllProducts = () => {
  const { data: products, isLoading, isError } = useFetchAllPlantsQuery();
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 8;
  const offset = currentPage * itemsPerPage;
  const currentItems = products?.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil((products?.length || 0) / itemsPerPage);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  if (isLoading) return <div className="text-center mt-10">Loading products...</div>;
  if (isError)
    return (
      <div className="text-center mt-10 text-red-500">Failed to load products.</div>
    );

  return (
    <div className="max-w-screen-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Semua Produk</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentItems?.map((product) => (
          <div
            key={product._id}
            className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition"
          >
            <Link to={`/product/${product._id}`}>
              <img
                src={product.coverImage}
                alt={product.title}
                className="w-full h-60 object-cover rounded-md mb-3"
              />
              <h2 className="text-lg font-semibold mb-1">{product.title}</h2>
            </Link>
            <p className="text-sm text-gray-500 mb-1 capitalize">
              {product.category}
            </p>
            <p className="text-primary font-semibold text-md mb-1">
              Rp{product.newPrice?.toLocaleString()}
              {product.oldPrice > product.newPrice && (
                <span className="text-gray-400 text-sm line-through ml-2">
                  Rp{product.oldPrice.toLocaleString()}
                </span>
              )}
            </p>
            <p className="text-sm text-gray-600 mb-3">Stok: {product.stock}</p>

            <button
              onClick={() => handleAddToCart(product)}
              className="w-full bg-primary text-white py-2 rounded-md flex items-center justify-center gap-2 hover:bg-blue-600 transition"
            >
              <FiShoppingCart />
              Tambah ke Keranjang
            </button>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-10 flex justify-center">
        <ReactPaginate
          previousLabel={'← Sebelumnya'}
          nextLabel={'Berikutnya →'}
          breakLabel={'...'}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={'flex gap-2 flex-wrap'}
          pageClassName={'px-3 py-1 border rounded text-sm'}
          previousClassName={'px-3 py-1 border rounded text-sm'}
          nextClassName={'px-3 py-1 border rounded text-sm'}
          activeClassName={'bg-primary text-white'}
          disabledClassName={'opacity-50 cursor-not-allowed'}
        />
      </div>
    </div>
  );
};

export default AllProducts;
