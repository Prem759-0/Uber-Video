import React from 'react'

import car from '../assets/car.jpg';
import bike from '../assets/bike.jpg';
import auto from '../assets/auto.jpg';

const VehiclePanel = (props) => {
  return (
    <div>
       <h3 className='p-1 text-center w-[93%] absolute top-0' onClick={()=>{
                props.setVehiclePanel(false)
              }}><i class="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h3>
              <h3 className='text-2xl font-semibold mb-5'>Choose a Vehicle</h3>
              <div onClick={()=>{
                props.setConfirmRidePanel(true)
              }} className="bg-white border-2 mb-3 active:border-black rounded-2xl shadow-md h-[99px] flex items-center px-4 justify-between">
                <img className="h-12 mr-3" src={car} alt="car" />
                <div className="flex flex-col  leading-tight w-1/2">
                <div className="flex items-center font-medium text-base text-black">
                         UberGo
                         <span className="flex items-center text-xl ml-2 text-gray-700">
                              <i className="ri-user-3-fill text-base mr-1"></i>
                             <span className="text-base font-semibold">4</span>
                         </span>
                            </div>
                  <span className="text-sm font-medium text-gray-700 mt-[2px]">
                    2 mins away
                  </span>
                  <span className="text-xs font-normal text-gray-500">
                    Affordable, compact rides
                  </span>
                </div>
                <h2 className="text-lg font-semibold text-black">₹193.20</h2>
              </div>
      
      
              <div
                  onClick={()=>{
                props.setConfirmRidePanel(true)
              }}
              className="bg-white border-2 mb-3 active:border-black rounded-2xl shadow-md h-[99px] flex items-center px-4 justify-between">
                <img className="h-12 mr-3" src={bike} alt="car" />
                <div className="flex flex-col  leading-tight w-1/2">
                 <div className="flex items-center font-medium text-base text-black">
                         Moto
                         <span className="flex items-center text-xl ml-2 text-gray-700">
                              <i className="ri-user-3-fill text-base mr-1"></i>
                             <span className="text-base font-semibold">1</span>
                         </span>
                            </div>
                  <span className="text-sm font-medium text-gray-700 mt-[2px]">
                    3 mins away
                  </span>
                  <span className="text-xs font-normal text-gray-500">
                    Affordable motorcycle rides
                  </span>
                </div>
                <h2 className="text-lg font-semibold text-black">₹65.17</h2>
              </div>
      
               <div onClick={()=>{
                props.setConfirmRidePanel(true)
              }} className="bg-white border-2 mb-2 active:border-black rounded-2xl  shadow-md h-[99px] flex items-center px-4  justify-between">
                <img className="h-12 mr-3" src={auto} alt="car" />
                <div className="flex flex-col  leading-tight w-1/2">
                  <div className="flex items-center font-medium text-base text-black">
                        UberAuto
                         <span className="flex items-center text-xl ml-2 text-gray-700">
                              <i className="ri-user-3-fill text-base mr-1"></i>
                             <span className="text-base font-semibold">3</span>
                         </span>
                            </div>
                  <span className="text-sm font-medium text-gray-700 mt-[2px]">
                    3 mins away
                  </span>
                  <span className="text-xs font-normal text-gray-500">
                    Affordable Auto rides
                  </span>
                </div>
                <h2 className="text-lg font-semibold text-black">₹118.68</h2>
              </div>
    </div>
  )
}

export default VehiclePanel
