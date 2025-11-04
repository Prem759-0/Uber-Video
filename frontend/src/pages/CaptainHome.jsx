import React from 'react'
 import uber2 from '../assets/uber2.gif';
 import logo from '../assets/logo.png';
 import car from '../assets/car.jpg';
import { Link } from 'react-router-dom';

const CaptainHome = () => {
  return (
      <div className='h-screen '>
        <div className='fixed p-3 top-0 flex items-center justify-between w-screen'>
          <img className='w-16' src={logo} alt='' />
           <Link to='/home' className='  h-10 w-10 bg-white flex items-center justify-center rounded-full'>
           <i class="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
        </div>
         <div className='h-1/2'>
           <img className='h-full w-full object-cover' src={uber2} />
          </div>
          <div className='h-1/2 p-4'>
              <div>
                <div>
                  <img src='' alt='' />
                  <h4>Harsh Patel</h4>
                </div>
                <div>
                  <h4>₹295.20</h4>
                  <p>Earned</p>
              </div>
          </div>
          <div>
            <div className='text-center'>
                <i className="text-2xl font-thin ri-timer-2-line"></i>
                <h5 className='text-lg font-medium'>10.2</h5>
                <p className='text-sm text-gray-600'>Hours Online</p>
            </div>

            <div className='text-center'>
              <i className="text-2xl font-thin ri-speed-up-fill"></i>
               <h5 className='text-lg font-medium'>10.2</h5>
                <p className='text-sm text-gray-600'>Hours Online</p>
            </div>

            <div className='text-center'>
              <i className="text-2xl font-thin ri-booklet-line"></i>
               <h5 className='text-lg font-medium'>10.2</h5>
                <p className='text-sm text-gray-600'>Hours Online</p>
            </div>
          </div>

     </div>
     </div>
  )
}

export default CaptainHome
