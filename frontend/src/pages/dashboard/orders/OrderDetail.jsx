import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetOrderByIdQuery } from '../../../redux/features/orders/ordersApi';

const OrderDetail = () => {
  const { id } = useParams();
  const {
    data: order,
    error,
    isLoading,
  } = useGetOrderByIdQuery(id, {
    skip: !id,
  });

  const formatRupiah = (value) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(value);
  };

  if (isLoading)
    return (
      <p className="text-center py-6 text-gray-500">Loading order details...</p>
    );
  if (error)
    return (
      <p className="text-center py-6 text-red-500">Failed to load order detail.</p>
    );
  if (!order)
    return <p className="text-center py-6 text-gray-600">Order not found.</p>;

  return (
    <div className="order-detail max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-6 border-b pb-2">
        Order Detail - <span className="text-indigo-600">#{order._id}</span>
      </h2>

      <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-gray-700">
        <div>
          <p>
            <span className="font-semibold">Name:</span> {order.name}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {order.email}
          </p>
          <p>
            <span className="font-semibold">Phone:</span> {order.phone}
          </p>
        </div>
        <div>
          <p>
            <span className="font-semibold">Address:</span>
            <br />
            <span className="text-gray-600 text-sm">
              {`${order.address.street}, ${order.address.kelurahan}, ${order.address.kecamatan}, ${order.address.city}, ${order.address.province}, ${order.address.zipcode}`}
            </span>
          </p>
          <p className="mt-3">
            <span className="font-semibold">Status:</span>{' '}
            <span className="capitalize">{order.status}</span>
          </p>
          <p className="mt-1">
            <span className="font-semibold">Order Date:</span>{' '}
            {new Date(order.createdAt).toLocaleString('id-ID')}
          </p>
        </div>
      </div>

      <h3 className="text-xl font-semibold mb-3 border-b pb-1">Products</h3>
      <table className="w-full border-collapse border border-gray-300 text-gray-700">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="border border-gray-300 p-3">Title</th>
            <th className="border border-gray-300 p-3">Quantity</th>
            <th className="border border-gray-300 p-3">Price</th>
            <th className="border border-gray-300 p-3">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {order.products.map((product) => (
            <tr key={product.productId} className="even:bg-gray-50">
              <td className="border border-gray-300 p-3">{product.title}</td>
              <td className="border border-gray-300 p-3">{product.quantity}</td>
              <td className="border border-gray-300 p-3">
                {formatRupiah(product.price)}
              </td>
              <td className="border border-gray-300 p-3">
                {formatRupiah(product.price * product.quantity)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-6 text-right text-lg font-semibold text-indigo-700">
        Total Price: {formatRupiah(order.totalPrice)}
      </div>
    </div>
  );
};

export default OrderDetail;
