import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import getBaseUrl from '../../../utils/baseURL'; // Pastikan ini mengarah ke base URL kamu

const baseQuery = fetchBaseQuery({
  baseUrl: `${getBaseUrl()}/api/plants`,
  credentials: 'include',
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('token');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const plantsApi = createApi({
  reducerPath: 'plantsApi',
  baseQuery,
  tagTypes: ['Plants'],
  endpoints: (builder) => ({
    fetchAllPlants: builder.query({
      query: () => '/',
      providesTags: ['Plants'],
    }),
    fetchPlantById: builder.query({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: 'Plants', id }],
    }),
    addPlant: builder.mutation({
      query: (newPlant) => ({
        url: '/create-plant',
        method: 'POST',
        body: newPlant,
      }),
      invalidatesTags: ['Plants'],
    }),
    updatePlant: builder.mutation({
      query: ({ id, updatedPlant }) => ({
        url: `/edit/${id}`,
        method: 'PUT',
        body: updatedPlant,
      }),
      invalidatesTags: ['Plants'],
    }),
    deletePlant: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Plants'],
    }),

    // ✅ Tambahan searchPlants
    searchPlants: builder.query({
      query: (keyword) => `/search/${keyword}`,
      providesTags: ['Plants'],
    }),
  }),
});

export const {
  useFetchAllPlantsQuery,
  useFetchPlantByIdQuery,
  useAddPlantMutation,
  useUpdatePlantMutation,
  useDeletePlantMutation,
  useSearchPlantsQuery,
} = plantsApi;

export default plantsApi;
