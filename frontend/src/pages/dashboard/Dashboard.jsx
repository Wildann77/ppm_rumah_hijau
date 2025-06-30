import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import getBaseUrl from '../../utils/baseURL';

import Loading from '../../components/Loading';
import { MdShoppingCart, MdAttachMoney, MdStore } from 'react-icons/md';
import RevenueChart from './RevenueChart ';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${getBaseUrl()}/api/admin`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setData(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-700">Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Products */}
        <div className="flex items-center p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition">
          <div className="p-4 bg-blue-100 text-blue-600 rounded-full mr-4">
            <MdStore className="text-3xl" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-600">Total Products</h2>
            <p className="text-2xl font-bold text-gray-800">
              {data?.totalPlants || 0}
            </p>
          </div>
        </div>

        {/* Sales */}
        <div className="flex items-center p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition">
          <div className="p-4 bg-green-100 text-green-600 rounded-full mr-4">
            <MdAttachMoney className="text-3xl" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-600">Total Sales</h2>
            <p className="text-2xl font-bold text-gray-800">
              {(data?.totalSales || 0).toLocaleString('id-ID', {
                style: 'currency',
                currency: 'IDR',
              })}
            </p>
          </div>
        </div>

        {/* Orders */}
        <div className="flex items-center p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition">
          <div className="p-4 bg-purple-100 text-purple-600 rounded-full mr-4">
            <MdShoppingCart className="text-3xl" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-600">Total Orders</h2>
            <p className="text-2xl font-bold text-gray-800">
              {data?.totalOrders || 0}
            </p>
          </div>
        </div>
      </div>

      {/* Revenue Chart
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Revenue Chart</h2>
        <RevenueChart />
      </div> */}
    </div>
  );
};

export default Dashboard;
