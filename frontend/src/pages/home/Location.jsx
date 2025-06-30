import React from 'react';

const Location = () => {
  return (
    <div className="py-16 px-6 md:px-12 bg-white">
      <div className="max-w-screen-xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-primary">
          Lokasi Toko Kami
        </h2>

        <div className="flex flex-col md:flex-row gap-10 items-start">
          {/* Info Lokasi */}
          <div className="md:w-1/2 w-full space-y-4">
            <h3 className="text-xl font-semibold text-primary">
              Toko Tanaman Rumah Hijau
            </h3>
            <p className="text-gray-700">
              Jl. Akasia Barat No.1, Ps. Batang, Kec. Brebes, Kabupaten Brebes, Jawa
              Tengah 52219
            </p>
            <p className="text-gray-700">Buka: Senin - Sabtu, 08.00 - 17.00</p>
            <a
              href="https://maps.app.goo.gl/a4ctrS74ynVAVdA16"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 px-6 py-2 bg-primary text-white rounded hover:bg-green-700 transition"
            >
              Lihat di Google Maps
            </a>
          </div>

          {/* Peta */}
          <div className="md:w-1/2 w-full h-64 md:h-80">
            <iframe
              title="Lokasi Toko"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.172679855373!2d109.0508492!3d-6.869901700000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6fb1b6129d9b67%3A0x4a85e53157a601ce!2sRumah%20Hijau%20Nursery!5e0!3m2!1sid!2sid!4v1749982699685!5m2!1sid!2sid"
              className="w-full h-full rounded shadow"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Location;
