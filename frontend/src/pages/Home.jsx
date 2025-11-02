import React, { useRef, useState } from 'react'
import logo from '../assets/logo.png';
import uber2 from '../assets/uber2.gif';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const Home = () => {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [panelOpen, setPanelOpen] = useState(false)

  const panelRef = useRef(null)
  const whiteRef = useRef(null)

  const submitHandler = (e)=>{
    e.preventDefault();
  }

  useGSAP(function(){
    if(panelOpen){
      // red panel slides up
      gsap.to(panelRef.current,{
        height:'70%',
        duration:0.4,
        ease:"power2.out"
      })
      // white box moves up
      gsap.to(whiteRef.current,{
        bottom:'70%',
        duration:0.4,
        ease:"power2.out"
      })
    }else{
      gsap.to(panelRef.current,{
        height:'0%',
        duration:0.3,
        ease:"power2.in"
      })
      gsap.to(whiteRef.current,{
        bottom:'0%',
        duration:0.3,
        ease:"power2.in"
      })
    }
  }, [panelOpen])

  return (
    <div className='h-screen relative overflow-hidden'>
      <img src={logo} alt="Uber Logo" className="w-16 absolute left-5 top-5" />

      <div className='h-screen w-screen'>
        <img className='h-full w-full object-cover' src={uber2}/>
      </div>

      {/* white bottom panel */}
      <div ref={whiteRef} className='bg-white absolute bottom-0 w-full p-6'>
        <h4 className='text-2xl font-semibold'>Find a trip</h4>

        <form onSubmit={submitHandler} className="mt-5 relative">

          {/* vertical line */}
          <div className="absolute left-7 top-4 bottom-4 w-[2px] bg-gray-600"></div>

          {/* pickup circle */}
          <div className="absolute left-6 top-3 w-3 h-3 bg-black rounded-full"></div>

          {/* destination circle */}
          <div className="absolute left-6 bottom-3 w-3 h-3 bg-black rounded-full"></div>

          {/* inputs */}
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
        className='bg-red-500 absolute bottom-0 left-0 w-full h-0'
      >
      </div>

    </div>
  )
}

export default Home;
