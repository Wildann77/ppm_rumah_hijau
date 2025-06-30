/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#50C878', // Emerald Green → warna utama
        secondary: '#0D0842', // Dark Indigo/Navy → untuk teks atau kontras elegan
        blackBG: '#F3F3F3', // Light Gray → latar belakang netral
        Favorite: '#FF5841', // Coral Red → warna aksen (untuk tombol CTA, wishlist, dll)
      },
      fontFamily: {
        primary: ['Montserrat', 'sans-serif'],
        secondary: ['Nunito Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
