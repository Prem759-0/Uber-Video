import React, { useRef, useState } from 'react'
import logo from '../assets/logo.png';
import uber2 from '../assets/uber2.gif';
import car from '../assets/car.jpg';
import bike from '../assets/bike.jpg';
import auto from '../assets/auto.jpg';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel';

const Home = () => {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [panelOpen, setPanelOpen] = useState(false)
  const panelCloseRef = useRef(null)
  const vehiclePanelRef = useRef(null)
  const [vehiclePanel, setVehicalpanel] = useState(false)

  const panelRef = useRef(null)
  const whiteRef = useRef(null)

  const submitHandler = (e)=>{
    e.preventDefault();
  }

  useGSAP(function(){
    if(panelOpen){
      gsap.to(panelRef.current,{
        height:'70%',
        duration:0.4,
        ease:"power2.out",
        padding:24
      })
      gsap.to(whiteRef.current,{
        bottom:'70%',
        duration:0.4,
        ease:"power2.out"
      })
      gsap.to(panelCloseRef.current,{
        opacity:1
      })
    }else{
      gsap.to(panelRef.current,{
        height:'0%',
        duration:0.3,
        ease:"power2.in",
        padding:0
      })
      gsap.to(whiteRef.current,{
        bottom:'0%',
        duration:0.3,
        ease:"power2.in"
      })
      gsap.to(panelCloseRef.current,{
        opacity:0
      })
    }
  }, [panelOpen])

  useGSAP(function(){
    if(vehiclePanel){
      gsap.to(vehiclePanelRef.current,{
      transform:'translateY(0)'
    })
    }else{
       gsap.to(vehiclePanelRef.current,{
      transform:'translateY(100%)'
    })
    }
  },[vehiclePanel])

  return (
    <div className='h-screen relative overflow-hidden'>
      <img src={logo} alt="Uber Logo" className="w-16 absolute left-5 top-5" />

      <div className='h-screen w-screen'>
        <img className='h-full w-full object-cover' src={uber2}/>
      </div>

      {/* white bottom panel */}
      <div ref={whiteRef} className='bg-white absolute bottom-0 w-full p-6 z-40'>
        <h5 ref={panelCloseRef} onClick={()=>{ setPanelOpen(false) }} className='absolute opacity-0 right-6 left-19 text-2xl'>
          <i className="ri-arrow-down-wide-line"></i>
        </h5>
        <h4 className='text-2xl font-semibold'>Find a trip</h4>

        <form onSubmit={submitHandler} className="mt-5 relative">

          <div className="absolute left-7 top-4 bottom-4 w-[2px] bg-gray-600"></div>

          <div className="absolute left-6 top-3 w-3 h-3 bg-black rounded-full"></div>

          <div className="absolute left-6 bottom-3 w-3 h-3 bg-black rounded-full"></div>

          <div className="flex flex-col gap-4">
            <input
              onFocus={()=> setPanelOpen(true)}
              value={pickup}
              onChange={(e)=> setPickup(e.target.value)}
              className='bg-[#eee] px-12 py-3 text-base rounded-lg w-full'
              type='text'
              placeholder='Add a pick-up location'
            />

            <input
              onFocus={()=> setPanelOpen(true)}
              value={destination}
              onChange={(e)=> setDestination(e.target.value)}
              className='bg-[#eee] px-12 py-3 text-base rounded-lg w-full'
              type='text'
              placeholder='Enter your destination'
            />
          </div>
        </form>
      </div>

      {/* sliding panel */}
      <div
        ref={panelRef}
        className='bg-white absolute bottom-0 left-0 w-full h-0 z-50'
      >
        <LocationSearchPanel vehiclePanel={vehiclePanel} setVehicalpanel={setVehicalpanel}/>
      </div>

      {/* car bottom card */}
      <div ref={vehiclePanelRef} className="fixed bottom-0 left-0 w-full bg-white rounded-t-3xl translate-y-full py-8  p-5 z-[998]">
        <h3 className='text-2xl font-semibold mb-5'>Choose a Vehicle</h3>
        <div className="bg-white border-2 mb-2 active:border-black rounded-2xl shadow-md h-[99px] flex items-center px-4 justify-between">
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


        <div className="bg-white border-2 mb-2 active:border-black rounded-2xl shadow-md h-[99px] flex items-center px-4 justify-between">
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

         <div className="bg-white border-2 mb-2 active:border-black rounded-2xl  shadow-md h-[99px] flex items-center px-4  justify-between">
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
    </div>
  )
}

export default Home;
