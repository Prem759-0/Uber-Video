import React from 'react'

const VehicleFound = (props) => {
    return (
        <div className='w-full h-full bg-green-500'>
            <div className='w-full h-full bg-green-500 flex flex-col items-center justify-center'>
                <h1 className='text-3xl font-bold text-white'>Vehicle Found</h1>
                <button onClick={() => props.setVehicleFound(false)} className='bg-white text-green-500 font-bold py-2 px-4 rounded-full mt-5'>Cancel</button>
            </div>
        </div>
    )
}

export default VehicleFound
