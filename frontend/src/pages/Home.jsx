import React, { useRef, useState, useEffect } from 'react'
import logo from '../assets/logo.png';
import uber2 from '../assets/uber2.gif';
import car from '../assets/car.jpg';
import bike from '../assets/bike.jpg';
import auto from '../assets/auto.jpg';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel';
import ConfirmRide from '../components/ConfirmRide';
import VehicleFound from '../components/VehicleFound';
import Loader from '../components/Loader';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';

const Home = () => {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [panelOpen, setPanelOpen] = useState(false)
  const panelCloseRef = useRef(null)
  const vehiclePanelRef = useRef(null)
  const confirmRidePanelRef = useRef(null)
  const vehicleFounddRef = useRef(null)
    const waitingForDriverRef = useRef(null)
  const [vehiclePanel, setVehiclePanel] = useState(false)
  const [confirmRidePanel, setConfirmRidePanel] = useState(false)
    const [ fare, setFare ] = useState({})
    const [ vehicleType, setVehicleType ] = useState(null)
  const [vehicleFound, setVehicleFound] = useState(false)
  const [loading, setLoading] = useState(false)
  const [vehicleFoundd, setVehicleFoundd] = useState(false)
   const [ waitingForDriver, setWaitingForDriver ] = useState(false)
  const vehicleFoundRef = useRef(null)
  const [ride, setRide] = useState(null)

  const createRide = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);
    setVehicleFound(true);
    setConfirmRidePanel(false);
  }

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
        ease:'power2.out',
        padding:24
      })
      gsap.to(whiteRef.current,{
        bottom:'70%',
        duration:0.4,
        ease:'power2.out'
      })
      gsap.to(panelCloseRef.current,{
        opacity:1
      })
    }else{
      gsap.to(panelRef.current,{
        height:'0%',
        duration:0.3,
        ease:'power2.in',
        padding:0
      })
      gsap.to(whiteRef.current,{
        bottom:'0%',
        duration:0.3,
        ease:'power2.in'
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

  useGSAP(function(){
    if(confirmRidePanel){
      gsap.to(confirmRidePanelRef.current,{
      transform:'translateY(0)'
    })
    }else{
       gsap.to(confirmRidePanelRef.current,{
      transform:'translateY(100%)'
    })
    }
  },[confirmRidePanel])

    useGSAP(function () {
        if (vehicleFoundd) {
            gsap.to(vehicleFounddRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(vehicleFounddRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [ vehicleFoundd ])

    useEffect(() => {
        if (vehicleFound) {
            setVehicleFoundd(false);
        }
    }, [vehicleFound]);

        useGSAP(function () {
        if (waitingForDriver) {
            gsap.to(waitingForDriverRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(waitingForDriverRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [ waitingForDriver ])


  return (
    <div className='h-screen relative overflow-hidden'>
      {loading && <Loader />}
      <img src={logo} alt="Uber Logo" className="w-16 absolute left-5 top-5" />

      <div onClick={()=>{setVehiclePanel(false)}}  className='h-screen w-screen'>
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
        <LocationSearchPanel  setPanelOpen={setPanelOpen}  setVehiclePanel={setVehiclePanel}/>
      </div>

      {/* car bottom card */}
      <div ref={vehiclePanelRef} className="fixed bottom-0 left-0 w-full bg-white rounded-t-3xl translate-y-full py-10 pt-14  p-5 z-[998]">
         <div>
       <h3 className='p-1 text-center w-[93%] absolute top-0' onClick={()=>{setVehiclePanel(false)}}><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h3>
              <h3 className='text-2xl font-semibold mb-5'>Choose a Vehicle</h3>
              <div onClick={() => { setVehicleType('UberGo'); setFare({'UberGo': '193.20'}); setConfirmRidePanel(true); setVehiclePanel(false); }} className="bg-white border-2 mb-3 active:border-black rounded-2xl shadow-md h-[99px] flex items-center px-4 justify-between">
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
      
      
              <div onClick={() => { setVehicleType('Moto'); setFare({'Moto': '65.17'}); setConfirmRidePanel(true); setVehiclePanel(false); }} className="bg-white border-2 mb-3 active:border-black rounded-2xl shadow-md h-[99px] flex items-center px-4 justify-between">
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
      
               <div onClick={() => { setVehicleType('UberAuto'); setFare({'UberAuto': '118.68'}); setConfirmRidePanel(true); setVehiclePanel(false); }} className="bg-white border-2 mb-2 active:border-black rounded-2xl  shadow-md h-[99px] flex items-center px-4  justify-between">
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

      <div ref={confirmRidePanelRef} className="fixed bottom-0 left-0 w-full bg-white rounded-t-3xl translate-y-full py-10 pt-14  p-5 z-[998]">
           <ConfirmRide 
            setConfirmRidePanel={setConfirmRidePanel} 
            pickup={pickup} 
            destination={destination} 
            fare={fare} 
            vehicleType={vehicleType} 
            setVehicleFoundd={setVehicleFoundd} 
            setVehicleFound={setVehicleFound} 
            createRide={createRide} 
          />
      </div>

      <div ref={vehicleFounddRef} className="fixed bottom-0 left-0 w-full bg-white rounded-t-3xl translate-y-full py-10 pt-14  p-5 z-[998]">
          <LookingForDriver 
            pickup={pickup} 
            destination={destination} 
            fare={fare} 
            vehicleType={vehicleType} 
            setVehicleFoundd={setVehicleFoundd} 
          />
      </div>

      <div ref={vehicleFoundRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12'>
          <LookingForDriver
              createRide={createRide}
              pickup={pickup}
              destination={destination}
              fare={fare}
              vehicleType={vehicleType}
              setVehicleFound={setVehicleFound} />
      </div>
   
      <div ref={waitingForDriverRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12'>
          <WaitingForDriver
              ride={ride}
              setVehicleFound={setVehicleFound}
              setWaitingForDriver={setWaitingForDriver}
              waitingForDriver={waitingForDriver} />
      </div>
  
      {vehicleFound && <VehicleFound setVehicleFound={setVehicleFound} />}
    </div>
  )
}

export default Home;