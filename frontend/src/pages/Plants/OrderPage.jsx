import React from 'react';
import { useGetOrderByEmailQuery } from '../../redux/features/orders/ordersApi';
import { useAuth } from '../../context/AuthContext';

const statusOptions = {
  pending: 'bg-yellow-200 text-yellow-800',
  confirmed: 'bg-blue-200 text-blue-800',
  processing: 'bg-indigo-200 text-indigo-800',
  shipped: 'bg-orange-200 text-orange-800',
  delivered: 'bg-green-200 text-green-800',
  cancelled: 'bg-red-200 text-red-800',
};

const OrderPage = () => {
  const { currentUser } = useAuth();
  const {
    data: orders = [],
    isLoading,
    isError,
  } = useGetOrderByEmailQuery(currentUser.email);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error getting orders</div>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Your Orders</h2>
      {orders.length === 0 ? (
        <div>No orders found!</div>
      ) : (
        <div>
          {orders.map((order, index) => (
            <div key={order._id} className="border-b mb-4 pb-4">
              <p className="p-1 bg-secondary text-white w-10 rounded mb-1">
                # {index + 1}
              </p>
              <h2 className="font-bold">Order ID: {order._id}</h2>
              <p className="text-gray-600">Name: {order.name}</p>
              <p className="text-gray-600">Email: {order.email}</p>
              <p className="text-gray-600">Phone: {order.phone}</p>
              <p className="text-gray-600">Total Price: ${order.totalPrice}</p>

              {/* ⬇️ STATUS DENGAN WARNA */}
              <p className="text-gray-600 mt-2">
                Status:{' '}
                <span
                  className={`px-2 py-1 rounded text-sm font-medium ${
                    statusOptions[order.status] || 'bg-gray-200 text-gray-800'
                  }`}
                >
                  {order.status}
                </span>
              </p>

              <h3 className="font-semibold mt-2">Address:</h3>
              <p>
                <strong>Street:</strong> {order.address.street}
                <br />
                <strong>Kelurahan:</strong> {order.address.kelurahan}
                <br />
                <strong>Kecamatan:</strong> {order.address.kecamatan}
                <br />
                <strong>Kota:</strong> {order.address.city}
                <br />
                <strong>Provinsi:</strong> {order.address.province}
                <br />
                <strong>Kode Pos:</strong> {order.address.zipcode}
              </p>

              <h3 className="font-semibold mt-2">Products:</h3>
              <ul>
                {Array.isArray(order.products) && order.products.length > 0 ? (
                  order.products.map((item, idx) => (
                    <li key={idx}>
                      <strong>Title:</strong> {item.title} |{' '}
                      <strong>Product ID:</strong> {item.productId} |{' '}
                      <strong>Quantity:</strong> {item.quantity} |{' '}
                      <strong>Price:</strong> ${item.price}
                    </li>
                  ))
                ) : (
                  <li>No products</li>
                )}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderPage;
