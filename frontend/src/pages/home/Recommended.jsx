import { React, useEffect, useState } from 'react';
import PlantCard from '../Plants/PlantCard';
import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import { Pagination, Navigation } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useFetchAllPlantsQuery } from '../../redux/features/plants/plantsApi';

const Recommended = () => {
  const { data: plants = [], isLoading, error } = useFetchAllPlantsQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading recommended plants</p>;

  const recommendedPlants = plants.filter((plant) => !plant.trending);

  return (
    <div className="py-16">
      <h2 className="text-3xl font-semibold mb-6">Recommended For You</h2>

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
      >
        {recommendedPlants.map((plant, index) => (
          <SwiperSlide key={index}>
            <PlantCard plant={plant} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Recommended;
