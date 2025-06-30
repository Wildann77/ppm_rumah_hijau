import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCreateOrderMutation } from '../../redux/features/orders/ordersApi';

import Swal from 'sweetalert2';
import { clearCart } from '../../redux/features/cart/cartSlice';

const CheckOutPage = () => {
  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(number);
  };
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.newPrice * item.quantity,
    0
  );
  const formattedTotalPrice = formatRupiah(totalPrice);

  const { currentUser } = useAuth();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);

  const onSubmit = async (data) => {
    const newOrder = {
      name: data.name,
      email: currentUser?.email,
      phone: data.phone,
      address: {
        street: data.address,
        kelurahan: data.kelurahan,
        kecamatan: data.kecamatan,
        city: data.city,
        province: data.province,
        zipcode: data.zipcode,
      },
      products: cartItems.map((item) => ({
        productId: item._id,
        quantity: item.quantity,
        price: item.newPrice,
        title: item.title,
      })),
      totalPrice,
    };

    try {
      const orderResponse = await createOrder(newOrder).unwrap();
      const orderId = orderResponse._id;

      // ✅ Kosongkan cart
      dispatch(clearCart());

      // ✅ Redirect ke WhatsApp
      const message = encodeURIComponent(
        `Halo admin, saya ingin pesan (Order ID: ${orderId}):\n\n${cartItems
          .map((item) => `• ${item.title} x ${item.quantity}`)
          .join('\n')}\n\nTotal: ${formattedTotalPrice}\nNama: ${
          data.name
        }\nAlamat: ${data.address}, ${data.kelurahan}, ${data.kecamatan}, ${
          data.city
        }, ${data.province}, ${data.zipcode}\nNo HP: ${data.phone}`
      );

      window.location.href = `https://wa.me/62882006200136?text=${message}`;
    } catch (error) {
      console.error('❌ Error place an order ', error);
      alert('Gagal membuat pesanan');
    }
  };

  console.log('🛒 cartItems:', cartItems);

  if (isLoading) return <div>Loading....</div>;
  return (
    <section>
      <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
        <div className="container max-w-screen-lg mx-auto">
          <h2 className="font-semibold text-xl text-gray-600 mb-2">
            Cash On Delivery
          </h2>
          <p className="text-gray-500 mb-2">Total Price: {formattedTotalPrice}</p>

          <p className="text-gray-500 mb-6">
            Items: {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
          </p>

          <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid gap-4 text-sm grid-cols-1 lg:grid-cols-3 my-8"
            >
              <div className="text-gray-600">
                <p className="font-medium text-lg">Personal Details</p>
                <p>Please fill out all the fields.</p>
              </div>

              <div className="lg:col-span-2">
                <div className="grid gap-4 text-sm grid-cols-1 md:grid-cols-5">
                  {/* Nama */}
                  <div className="md:col-span-5">
                    <label htmlFor="name">Nama Lengkap</label>
                    <input
                      {...register('name', { required: 'Nama Lengkap wajib diisi' })}
                      type="text"
                      id="name"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs">{errors.name.message}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="md:col-span-5">
                    <label htmlFor="email">Email</label>
                    <input
                      type="text"
                      id="email"
                      readOnly
                      defaultValue={currentUser?.email}
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-100"
                    />
                  </div>

                  {/* Nomor Telepon */}
                  <div className="md:col-span-5">
                    <label htmlFor="phone">Nomor Telepon</label>
                    <input
                      {...register('phone', {
                        required: 'Nomor Telepon wajib diisi',
                      })}
                      type="text"
                      id="phone"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      placeholder="+62 812-3456-7890"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs">{errors.phone.message}</p>
                    )}
                  </div>

                  {/* Alamat Lengkap */}
                  <div className="md:col-span-5">
                    <label htmlFor="address">Alamat Lengkap (Jalan, RT/RW)</label>
                    <input
                      {...register('address', { required: 'Alamat wajib diisi' })}
                      type="text"
                      id="address"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    />
                    {errors.address && (
                      <p className="text-red-500 text-xs">
                        {errors.address.message}
                      </p>
                    )}
                  </div>

                  {/* Kelurahan / Desa */}
                  <div className="md:col-span-2">
                    <label htmlFor="kelurahan">Kelurahan / Desa</label>
                    <input
                      {...register('kelurahan', {
                        required: 'Kelurahan / Desa wajib diisi',
                      })}
                      type="text"
                      id="kelurahan"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    />
                    {errors.kelurahan && (
                      <p className="text-red-500 text-xs">
                        {errors.kelurahan.message}
                      </p>
                    )}
                  </div>

                  {/* Kecamatan */}
                  <div className="md:col-span-3">
                    <label htmlFor="kecamatan">Kecamatan</label>
                    <input
                      {...register('kecamatan', {
                        required: 'Kecamatan wajib diisi',
                      })}
                      type="text"
                      id="kecamatan"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    />
                    {errors.kecamatan && (
                      <p className="text-red-500 text-xs">
                        {errors.kecamatan.message}
                      </p>
                    )}
                  </div>

                  {/* Kota / Kabupaten */}
                  <div className="md:col-span-3">
                    <label htmlFor="city">Kota / Kabupaten</label>
                    <input
                      {...register('city', {
                        required: 'Kota/Kabupaten wajib diisi',
                      })}
                      type="text"
                      id="city"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    />
                    {errors.city && (
                      <p className="text-red-500 text-xs">{errors.city.message}</p>
                    )}
                  </div>

                  {/* Provinsi */}
                  <div className="md:col-span-2">
                    <label htmlFor="province">Provinsi</label>
                    <input
                      {...register('province', { required: 'Provinsi wajib diisi' })}
                      type="text"
                      id="province"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    />
                    {errors.province && (
                      <p className="text-red-500 text-xs">
                        {errors.province.message}
                      </p>
                    )}
                  </div>

                  {/* Kode Pos */}
                  <div className="md:col-span-2">
                    <label htmlFor="zipcode">Kode Pos</label>
                    <input
                      {...register('zipcode', { required: 'Kode Pos wajib diisi' })}
                      type="text"
                      id="zipcode"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    />
                    {errors.zipcode && (
                      <p className="text-red-500 text-xs">
                        {errors.zipcode.message}
                      </p>
                    )}
                  </div>
                  {/* ✅ Checkbox Terms & Conditions */}
                  <div className="md:col-span-5 mt-3">
                    <div className="inline-flex items-center">
                      <input
                        type="checkbox"
                        id="billing_same"
                        className="form-checkbox"
                        onChange={(e) => setIsChecked(e.target.checked)}
                      />
                      <label htmlFor="billing_same" className="ml-2">
                        I agree to the{' '}
                        <Link className="underline text-blue-600">
                          Terms & Conditions
                        </Link>{' '}
                        and{' '}
                        <Link className="underline text-blue-600">
                          Shopping Policy
                        </Link>
                        .
                      </label>
                    </div>
                  </div>

                  {/* ✅ Tombol Checkout */}
                  <div className="md:col-span-5 text-right">
                    <button
                      type="submit"
                      disabled={!isChecked}
                      className={`py-2 px-4 rounded text-white font-bold transition-all ${
                        isChecked
                          ? 'bg-blue-500 hover:bg-blue-700'
                          : 'bg-gray-400 cursor-not-allowed'
                      }`}
                    >
                      Place an Order
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckOutPage;
