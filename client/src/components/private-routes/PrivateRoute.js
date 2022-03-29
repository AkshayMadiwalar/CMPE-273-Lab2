import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import constants from './../../utils/constants.json'

const PrivateRoute = () => {

    const [session, setSession] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(async () => {
        try {
            const res = await axios.post(constants.uri+"/users/auth")
            console.log(res,"-------------")
            if (res.status != 200) {
                setSession(false)
                setLoading(false)
            } else {
                setSession(true)
                setLoading(false)
            }
        } catch (error) {
            setSession(false)
            setLoading(false)
        }


    }, [])

    // if(!loading){
        
    //     if (session) {
    //         console.log("--2--")
    //         return <Outlet />
    //     }
    //     console.log("--3--")
    //     return <Navigate to="/dashboard" />
    // }

    const token = window.localStorage.getItem('userdetails')

    return  token ? <Outlet /> : <Navigate to="/dashboard" />;
    
}

export default PrivateRoute