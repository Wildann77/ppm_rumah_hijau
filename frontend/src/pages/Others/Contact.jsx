import React from 'react';

const Contact = () => {
  return (
    <div className="px-4 md:px-20 py-16 bg-white text-gray-800">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-primary">
        Hubungi Kami
      </h2>

      <div className="max-w-3xl mx-auto space-y-6 text-justify">
        <p>
          Kami senang mendengar dari Anda! Jika Anda memiliki pertanyaan, saran, atau
          ingin berdiskusi mengenai tanaman yang cocok untuk rumah Anda, silakan
          hubungi kami melalui salah satu cara di bawah ini.
        </p>

        <div className="space-y-2">
          <p>
            <span className="font-semibold">Alamat:</span>Jl. Akasia Barat No.1, Ps.
            Batang, Kec. Brebes, Kabupaten Brebes, Jawa Tengah 52219
          </p>
          <p>
            <span className="font-semibold">Telepon:</span> 085642759675
          </p>
          <p>
            <span className="font-semibold">Email:</span> info@rumahhijau.com
          </p>
          <p>
            <span className="font-semibold">Jam Operasional:</span> Senin - Sabtu,
            08.00 - 17.00 WIB
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
