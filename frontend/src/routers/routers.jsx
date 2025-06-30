import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/home/Home';
import Login from '../components/Login';
import Register from '../components/Register';
import CartPage from '../pages/Plants/CartPage';
import CheckOut from '../pages/Plants/CheckOutPage';
import CheckOutPage from '../pages/Plants/CheckOutPage';
import SingleBook from '../pages/Plants/SinglePlant';
import PrivateRoute from './PrivateRoute';
import OrderPage from '../pages/Plants/OrderPage';
import AdminRoute from './AdminRoute';
import AdminLogin from '../components/AdminLogin';
import DashboardLayout from '../pages/dashboard/DashboardLayout';
import Dashboard from '../pages/dashboard/Dashboard';
import ManageBooks from '../pages/dashboard/managePlants/ManagePlants';
import AddBook from '../pages/dashboard/addPlant/AddPlant';
import UpdateBook from '../pages/dashboard/EditPlant/UpdatePlant';
import ManageOrders from '../pages/dashboard/orders/OrderList';
import OrderDetail from '../pages/dashboard/orders/OrderDetail';
import AllProducts from '../pages/Plants/AllProducts';
import SearchPage from '../pages/Plants/SearchPage';
import SinglePlant from '../pages/Plants/SinglePlant';
import AddPlant from '../pages/dashboard/addPlant/AddPlant';
import UpdatePlant from '../pages/dashboard/EditPlant/UpdatePlant';
import ManagePlants from '../pages/dashboard/managePlants/ManagePlants';
import About from '../pages/Others/About';
import Contact from '../pages/Others/Contact';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: (
          <h1>
            <Home />
          </h1>
        ),
      },
      {
        path: '/orders',
        element: (
          <PrivateRoute>
            <OrderPage />
          </PrivateRoute>
        ),
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'cart',
        element: <CartPage />,
      },
      {
        path: 'checkout',
        element: (
          <PrivateRoute>
            <CheckOutPage />
          </PrivateRoute>
        ),
      },
      {
        path: '/product/:id',
        element: <SinglePlant />,
      },
      {
        path: '/products',
        element: <AllProducts />,
      },
      {
        path: '/search',
        element: <SearchPage />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/contact',
        element: <Contact />,
      },
    ],
  },
  {
    path: '/admin',
    element: <AdminLogin />,
  },
  {
    path: '/dashboard',
    element: (
      <AdminRoute>
        <DashboardLayout />
      </AdminRoute>
    ),
    children: [
      {
        path: '',
        element: (
          <AdminRoute>
            <Dashboard />
          </AdminRoute>
        ),
      },
      {
        path: 'add-new-plant',
        element: (
          <AdminRoute>
            <AddPlant />
          </AdminRoute>
        ),
      },
      {
        path: 'edit-plant/:id',
        element: (
          <AdminRoute>
            <UpdatePlant />
          </AdminRoute>
        ),
      },
      {
        path: 'manage-plants',
        element: (
          <AdminRoute>
            <ManagePlants />
          </AdminRoute>
        ),
      },
      {
        path: 'manage-orders',
        element: (
          <AdminRoute>
            <ManageOrders />
          </AdminRoute>
        ),
      },
      {
        path: 'order-detail/:id',
        element: (
          <AdminRoute>
            <OrderDetail />
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default router;
