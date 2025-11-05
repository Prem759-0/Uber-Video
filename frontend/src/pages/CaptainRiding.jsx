import React, { useRef, useState } from 'react'
 import uber2 from '../assets/uber2.gif';
 import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import FinishRide from '../components/FinishRide';

const CaptainRiding = () => {

    const [finishRidePanel, setFinishRidePanel] = useState(false)
    const finishRidePanelRef  = useRef(null)

           useGSAP(function () {
           if (finishRidePanel) {
               gsap.to(finishRidePanelRef.current, {
                   transform: 'translateY(0)'
               })
           } else {
               gsap.to(finishRidePanelRef.current, {
                   transform: 'translateY(100%)'
               })
           }
       }, [finishRidePanel ])

  return (
      <div className='h-screen relative'>
        
        <div className='fixed p-6 top-0 flex items-center justify-between w-screen'>
          <img className='w-16' src={logo} alt='' />
           <Link to='/captain-home' className='  h-10 w-10 bg-white flex items-center justify-center rounded-full'>
           <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
        </div>
         <div className='h-4/5'>
           <img className='h-full w-full object-cover' src={uber2} />
          </div>

         <div className='h-1/5 p-6 flex items-center justify-between relative bg-yellow-400 rounded-3xl'
         onClick={()=>{
            setFinishRidePanel(true)
         }}>
          <h5 className='p-1 text-center w-[90%] absolute top-0' onClick={() => {
                 
              }}><i className="text-3xl text-gray-800 ri-arrow-up-wide-line"></i></h5>
            <h4 className='text-xl font-semibold'>4 KM away</h4>
            <button className='  bg-green-600 text-white font-semibold p-3 px-10 rounded-lg'>Complete Ride</button>
         </div>
          
            <div ref={finishRidePanelRef}  className="translate-y-full fixed bottom-0 w-full bg-white rounded-t-3xl py-10 px-3 pt-14  p-5 z-[998]">
               <FinishRide setFinishRidePanel={setFinishRidePanel}/>
            </div>

         </div>
  )
}

export default CaptainRiding
