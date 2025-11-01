import React from 'react';
import logo from '../assets/logo.png';
import continue_page from '../assets/continue_page.png';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      {/* Outer container is not necessary unless you need to control the positioning of this section on the page */}
      <div
        className="h-screen pt-8  bg-center flex justify-between flex-col w-full bg-red-400"
        style={{
          backgroundImage: `url(${continue_page})`,
          backgroundSize: 'cover', // Ensures the background covers the entire area
          backgroundRepeat: 'no-repeat', // Prevents the image from repeating
          backgroundPosition: 'center', // Centers the image
        }}
      >
        <img src={logo} alt="Uber Logo" className="w-16 ml-8" />
        <div className="bg-white pb-7 py-4 px-4">
          <h2 className="text-3xl font-bold">Get Started with Uber</h2>
             <Link to='/login' className="flex items-center justify-center w-full bg-black text-white py-3 rounded-full mt-5">Continue</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
