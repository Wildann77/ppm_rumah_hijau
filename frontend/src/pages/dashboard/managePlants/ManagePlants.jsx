import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import {
  useDeletePlantMutation,
  useFetchAllPlantsQuery,
} from '../../../redux/features/plants/plantsApi';

const formatRupiah = (value) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(value);

const ITEMS_PER_PAGE = 8;

const ManagePlants = () => {
  const navigate = useNavigate();
  const { data: plants, refetch } = useFetchAllPlantsQuery();
  const [deletePlant] = useDeletePlantMutation();

  const [currentPage, setCurrentPage] = useState(0);

  const handleDeletePlant = async (id) => {
    try {
      await deletePlant(id).unwrap();
      alert('Plant deleted successfully!');
      refetch();
    } catch (error) {
      console.error('Failed to delete plant:', error.message);
      alert('Failed to delete plant. Please try again.');
    }
  };

  const offset = currentPage * ITEMS_PER_PAGE;
  const currentPlants = plants?.slice(offset, offset + ITEMS_PER_PAGE);
  const pageCount = Math.ceil((plants?.length || 0) / ITEMS_PER_PAGE);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <section className="py-1 bg-blueGray-50">
      <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                <h3 className="font-semibold text-base text-blueGray-700">
                  All Plants
                </h3>
              </div>
              <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                <button
                  className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                >
                  See all
                </button>
              </div>
            </div>
          </div>

          <div className="block w-full overflow-x-auto">
            <table className="items-center bg-transparent w-full border-collapse">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-xs font-semibold text-left bg-blueGray-50 border border-blueGray-100">
                    #
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold text-left bg-blueGray-50 border border-blueGray-100">
                    Plant Title
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold text-left bg-blueGray-50 border border-blueGray-100">
                    Category
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold text-left bg-blueGray-50 border border-blueGray-100">
                    Price
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold text-left bg-blueGray-50 border border-blueGray-100">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentPlants && currentPlants.length > 0 ? (
                  currentPlants.map((plant, index) => (
                    <tr key={plant._id}>
                      <td className="px-6 py-4 text-xs border">
                        {offset + index + 1}
                      </td>
                      <td className="px-6 py-4 text-xs border">{plant.title}</td>
                      <td className="px-6 py-4 text-xs border">{plant.category}</td>
                      <td className="px-6 py-4 text-xs border">
                        {formatRupiah(plant.newPrice)}
                      </td>
                      <td className="px-6 py-4 text-xs border space-x-2">
                        <Link
                          to={`/dashboard/edit-plant/${plant._id}`}
                          className="text-indigo-600 hover:text-indigo-800 underline"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDeletePlant(plant._id)}
                          className="bg-red-500 text-white px-3 py-1 rounded-full text-xs"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-6 text-gray-400">
                      Tidak ada tanaman ditemukan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="py-4 flex justify-center">
            <ReactPaginate
              previousLabel={'←'}
              nextLabel={'→'}
              breakLabel={'...'}
              pageCount={pageCount}
              marginPagesDisplayed={1}
              pageRangeDisplayed={2}
              onPageChange={handlePageClick}
              containerClassName={'flex items-center space-x-2'}
              pageClassName={'px-3 py-1 border rounded text-sm'}
              activeClassName={'bg-indigo-500 text-white'}
              previousClassName={'px-3 py-1 border rounded text-sm'}
              nextClassName={'px-3 py-1 border rounded text-sm'}
              disabledClassName={'opacity-50 cursor-not-allowed'}
              forcePage={currentPage}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManagePlants;
