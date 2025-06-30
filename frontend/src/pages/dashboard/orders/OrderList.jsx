import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import {
  useDeleteOrderMutation,
  useGetAllOrdersQuery,
  useUpdateOrderMutation,
} from '../../../redux/features/orders/ordersApi';

const statusOptions = {
  pending: 'bg-yellow-200 text-yellow-800',
  confirmed: 'bg-blue-200 text-blue-800',
  processing: 'bg-indigo-200 text-indigo-800',
  shipped: 'bg-orange-200 text-orange-800',
  delivered: 'bg-green-200 text-green-800',
  cancelled: 'bg-red-200 text-red-800',
};

const formatDate = (date) =>
  new Intl.DateTimeFormat('id-ID', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(date));

const formatCurrency = (amount) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  }).format(amount);

const ITEMS_PER_PAGE = 10;

const ManageOrders = () => {
  const navigate = useNavigate();
  const { data: orders = [], isLoading, isError, refetch } = useGetAllOrdersQuery();
  const [updateStatus, { isLoading: isUpdating }] = useUpdateOrderMutation();

  // State pagination
  const [currentPage, setCurrentPage] = useState(0);
  const pageCount = Math.ceil(orders.length / ITEMS_PER_PAGE);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const [deleteOrder] = useDeleteOrderMutation();

  const handleDeleteOrder = async (orderId) => {
    const confirmed = window.confirm('Yakin ingin menghapus order ini?');
    if (!confirmed) return;

    try {
      await deleteOrder(orderId).unwrap();
      alert('Order berhasil dihapus.');
      refetch();
    } catch (err) {
      console.error(err);
      alert('Gagal menghapus order: ' + (err?.data?.message || err.message));
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    if (newStatus === 'cancelled') {
      const confirmed = window.confirm(
        'Apakah kamu yakin ingin membatalkan order ini? Stok akan dikembalikan.'
      );
      if (!confirmed) return;
    }

    try {
      await updateStatus({ id: orderId, status: newStatus }).unwrap();
      alert('Status order berhasil diperbarui.');
      refetch();
    } catch (err) {
      console.error(err);
      alert(
        'Gagal memperbarui status order: ' + (err?.data?.message || err.message)
      );
    }
  };

  // Pagination slicing
  const startIndex = currentPage * ITEMS_PER_PAGE;
  const currentOrders = orders.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  if (isLoading) return <p className="text-center py-10">Memuat data order...</p>;
  if (isError)
    return (
      <p className="text-center text-red-500 py-10">Gagal memuat data order.</p>
    );

  return (
    <section className="py-6 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Kelola Order</h2>
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-4 py-3">No</th>
                <th className="px-4 py-3">Order ID</th>
                <th className="px-4 py-3">Pelanggan</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Tanggal</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.length > 0 ? (
                currentOrders.map((order, idx) => (
                  <tr key={order._id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3">{startIndex + idx + 1}</td>
                    <td className="px-4 py-3 font-mono text-xs">{order._id}</td>
                    <td className="px-4 py-3">{order.name}</td>
                    <td className="px-4 py-3">{order.email}</td>
                    <td className="px-4 py-3">{formatDate(order.createdAt)}</td>
                    <td className="px-4 py-3 font-semibold">
                      {formatCurrency(order.totalPrice)}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          statusOptions[order.status] || 'bg-gray-200 text-gray-700'
                        }`}
                      >
                        {order.status.charAt(0).toUpperCase() +
                          order.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() =>
                            navigate(`/dashboard/order-detail/${order._id}`)
                          }
                          className="text-white bg-indigo-500 hover:bg-indigo-600 px-3 py-1 rounded text-xs font-semibold"
                        >
                          Detail
                        </button>
                        <select
                          disabled={isUpdating}
                          value={order.status}
                          onChange={(e) =>
                            handleStatusChange(order._id, e.target.value)
                          }
                          className="border border-gray-300 rounded px-2 py-1 text-xs bg-white"
                        >
                          {Object.keys(statusOptions).map((key) => (
                            <option key={key} value={key}>
                              {key.charAt(0).toUpperCase() + key.slice(1)}
                            </option>
                          ))}
                        </select>
                        <button
                          onClick={() => handleDeleteOrder(order._id)}
                          className="text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-xs font-semibold"
                        >
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-8 text-gray-400">
                    Tidak ada data order.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* React Paginate */}
        {orders.length > ITEMS_PER_PAGE && (
          <div className="flex justify-center mt-6">
            <ReactPaginate
              breakLabel="..."
              nextLabel="→"
              previousLabel="←"
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              pageCount={pageCount}
              renderOnZeroPageCount={null}
              containerClassName="flex gap-2 text-sm"
              pageClassName="border px-3 py-1 rounded hover:bg-gray-200"
              activeClassName="bg-indigo-500 text-white"
              previousClassName="border px-3 py-1 rounded hover:bg-gray-200"
              nextClassName="border px-3 py-1 rounded hover:bg-gray-200"
              disabledClassName="opacity-50"
              forcePage={currentPage}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default ManageOrders;
