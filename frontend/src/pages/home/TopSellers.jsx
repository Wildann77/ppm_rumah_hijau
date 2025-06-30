import React, { useEffect, useState } from 'react';
import PlantCard from '../Plants/PlantCard';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import { Pagination, Navigation } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useFetchAllPlantsQuery } from '../../redux/features/plants/plantsApi';

const categories = [
  'Pilih kategori',
  'Hias',
  'Herbal',
  'Hanging',
  'Indoor',
  'Outdoor',
  'Penghijauan',
  'Media Tanam',
  'Tanaman Buah',
];

const TopSellers = () => {
  const [selectedCategory, setSelectedCategory] = useState('Pilih kategori');

  const { data: plants = [] } = useFetchAllPlantsQuery();

  // const filteredPlants =
  //   selectedCategory === 'Pilih kategori'
  //     ? plants
  //     : plants.filter((plant) => plant.category === selectedCategory.toLowerCase());

  const filteredPlants =
    selectedCategory === 'Pilih kategori'
      ? plants
      : plants.filter(
          (plant) =>
            plant.category?.toLowerCase().replace(/\s+/g, '-') ===
            selectedCategory.toLowerCase().replace(/\s+/g, '-')
        );

  useEffect(() => {
    console.log('Selected:', selectedCategory);
    console.log(
      'Categories found:',
      plants.map((p) => p.category)
    );
  }, [selectedCategory, plants]);

  return (
    <div className="py-1=">
      <h2 className="text-3xl font-semibold mb-6">Top Sellers</h2>
      {/* category filtering */}
      <div className="mb-8 flex items-end">
        <select
          onChange={(e) => setSelectedCategory(e.target.value)}
          name="category"
          id="category"
          className="border bg-[#EAEAEA] border-gray-300 rounded-md px-4 py-2 focus:outline-none "
        >
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        navigation={true}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 50,
          },
          1180: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {filteredPlants.length > 0 &&
          filteredPlants.map((plant, index) => (
            <SwiperSlide key={index}>
              <PlantCard plant={plant} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default TopSellers;
