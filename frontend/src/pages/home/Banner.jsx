import React from "react";
import { Link } from "react-router-dom";
import bannerImg from "../../assets/plants/logo.png"; // Adjust the path as necessary

const Banner = () => {
  return (
    <div className="flex flex-col md:flex-row-reverse py-16 justify-between items-center gap-12">
      <div className="md:w-1/2 w-full flex items-center md:justify-end">
        <img src={bannerImg} alt="Tanaman segar" />
      </div>
      <div className="md:w-1/2 w-full">
        <h1 className="md:text-5xl text-2xl font-medium mb-7">
          Tanaman Segar Dari Kami
        </h1>
        <p className="mb-10">
          Saatnya mempercantik rumah dan ruang kerja Anda dengan koleksi tanaman terbaru kami. Mulai dari tanaman hias indoor, herbal, hingga tanaman gantung—semuanya segar dan siap memperindah hari-hari Anda.
        </p>
        <Link to="/products" className="btn-primary">
          Lihat Koleksi
        </Link>
      </div>
    </div>
  );
};

export default Banner;
