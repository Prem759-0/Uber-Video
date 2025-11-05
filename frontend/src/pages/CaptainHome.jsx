import React, { useState } from 'react'
 import uber2 from '../assets/uber2.gif';
 import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import CaptainDetails from '../components/CaptainDetails';
import RidePOPUp from '../components/RidePOPUp';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';
import ConfirmRidePOPUp from '../components/ConfirmRidePOPUp';

const CaptainHome = () => {

  const [ridePopupPanel, setRidePopupPanel] = useState(true)
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false)

  const ridePopupPanelRef = useRef(null)
  const confirmRidePopupPanelRef = useRef(null)



        useGSAP(function () {
        if (ridePopupPanel) {
            gsap.to(ridePopupPanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(ridePopupPanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [ ridePopupPanel ])

        useGSAP(function () {
        if (confirmRidePopupPanel) {
            gsap.to(confirmRidePopupPanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(confirmRidePopupPanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [confirmRidePopupPanel ])

  return (
      <div className='h-screen '>
        <div className='fixed p-6 top-0 flex items-center justify-between w-screen'>
          <img className='w-16' src={logo} alt='' />
           <Link to='/captain-home' className='  h-10 w-10 bg-white flex items-center justify-center rounded-full'>
           <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
        </div>
         <div className='h-3/5'>
           <img className='h-full w-full object-cover' src={uber2} />
          </div>

          <div className='h-2/5 p-6'>
          <CaptainDetails/>
           </div>
        <div ref={ridePopupPanelRef}  className="translate-y-full fixed bottom-0 left-0 w-full bg-white rounded-t-3xl  py-10 pt-14  p-5 z-[998]">
          <RidePOPUp setRidePopupPanel={setRidePopupPanel} setConfirmRidePopupPanel={setConfirmRidePopupPanel}/>
         </div>

        <div ref={ confirmRidePopupPanelRef}  className="translate-y-full h-screen fixed bottom-0 left-0 w-full bg-white rounded-t-3xl  py-10 pt-14  p-5 z-[998]">
          <ConfirmRidePOPUp setConfirmRidePopupPanel={setConfirmRidePopupPanel} setRidePopupPanel={setRidePopupPanel}/>
         </div>

         </div>
     
  )
}

export default CaptainHome
