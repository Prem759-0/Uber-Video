import React from 'react'
import map from "../assets/map.svg"

const LocationSearchPanel = (props) => {
  console.log(props);

  const locations = [
     "24B, Near Kapoor's cafe, Sheryians Coding School, Bhopal",
     "25B, Near A cafe, Sheryians Coding School, Bhopal",
     "26B, Near F cafe, Sheryians Coding School, Bhopal",
     "27B, Near G cafe, Sheryians Coding School, Bhopal",
  ]
 

  return (
    <div>
      {
        locations.map(function(elem){
          return  <div className='flex gap-4  border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start'>
        <h2 className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full'><img className='h-5' src={map} /></h2>
        <h4 className='font-medium'>{elem}</h4>
       </div>
        })
      }
       
    </div>
  )
}

export default LocationSearchPanel
