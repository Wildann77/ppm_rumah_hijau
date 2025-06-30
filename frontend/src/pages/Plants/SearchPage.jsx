import React, { useState } from 'react';
import { useSearchPlantsQuery } from '../../redux/features/plants/plantsApi';
import PlantCard from './PlantCard';

const SearchPage = () => {
  const [keyword, setKeyword] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const { data, error, isLoading, isFetching } = useSearchPlantsQuery(searchTerm, {
    skip: !searchTerm, // Jangan fetch kalau belum ada searchTerm
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      setSearchTerm(keyword.trim());
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Cari Tanaman</h1>

      {/* Input Search */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2 mb-6">
        <input
          type="text"
          placeholder="Masukkan kata kunci..."
          className="border px-4 py-2 rounded w-full max-w-md"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Cari
        </button>
      </form>

      {/* Loading, Error, or Results */}
      {isLoading || isFetching ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">Terjadi kesalahan saat memuat data.</p>
      ) : data?.data?.length === 0 ? (
        <p className="text-gray-500">
          Tidak ada hasil ditemukan untuk "{searchTerm}"
        </p>
      ) : (
        <div>
          <h2 className="text-xl font-semibold mb-2">Hasil untuk: "{searchTerm}"</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {data?.data?.map((plant) => (
              <PlantCard key={plant._id} plant={plant} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
