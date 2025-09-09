import React from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const VerifyGuard = ({ children }) => {
    const user = useSelector(state => state?.auth?.user?.isVerified)
    const navigate = useNavigate()

    useEffect(() => {
        console.log("SARDOR: ", user)
        if(!user) {
            navigate('/verify-account')
        }
    }, [user])
    
    return children
}

export default VerifyGuard