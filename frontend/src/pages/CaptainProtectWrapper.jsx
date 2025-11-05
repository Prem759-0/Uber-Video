import React, { useContext, useEffect, useState } from 'react'
import { CaptainDataContext } from "../context/CaptainContext"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../components/Loader.css' // Import the CSS file for the loader

const CaptainProtectWrapper = ({ children }) => {

    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const { captain, setCaptain } = useContext(CaptainDataContext)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (!token) {
            navigate('/captain-login')
        }

        axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            if (response.status === 200) {
                setCaptain(response.data.captain)
                setIsLoading(false)
            }
        })
        .catch(err => {
            localStorage.removeItem('token')
            navigate('/captain-login')
        })
    }, [token])

    if (isLoading) {
        return (
            <div className="loader-overlay">
                <div className="loader-container">
                    <div className="dot dot-1"></div>
                    <div className="dot dot-2"></div>
                    <div className="dot dot-3"></div>
                </div>
                <p className="text-lg font-medium text-white mt-4">Loading Captain Profile...</p>
            </div>
        )
    }

    return (
        <>
            {children}
        </>
    )
}

export default CaptainProtectWrapper
