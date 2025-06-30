import React from 'react';
import Banner from './Banner';
import TopSellers from './TopSellers';
import Recommended from './Recommended';
// import News from './News';
import Location from './Location';

const Home = () => {
  return (
    <div className="px-4 md:px-6 lg:px-8 max-w-9xl mx-auto">
      <Banner />
      <TopSellers />
      <Recommended />
      {/* <News /> */}
      <Location />
    </div>
  );
};

export default Home;
