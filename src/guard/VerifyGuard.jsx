import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const VerifyGuard = ({ children }) => {
  const user = useSelector((state) => state?.auth?.user?.isVerified)
  const navigate = useNavigate()

  useEffect(() => {
    console.log("USER STATUS:", user)
    if (user === false) {
      navigate("/verify-account")
    }
  }, [user, navigate])

  return children
}

export default VerifyGuard
