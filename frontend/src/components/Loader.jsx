import React from 'react';
import './Loader.css';

const Loader = () => {
  return (
    <div className="loader-overlay">
      <div className="loader-container">
        <div className="dot dot-1"></div>
        <div className="dot dot-2"></div>
        <div className="dot dot-3"></div>
      </div>
      <h1 className='text-3xl font-bold text-white mt-5'>Finding your ride...</h1>
    </div>
  );
};

export default Loader;