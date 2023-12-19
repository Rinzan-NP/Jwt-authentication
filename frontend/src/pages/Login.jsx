import React from 'react'
import LoginForm from '../components/LoginForm'
import { useSelector } from 'react-redux'

const Login = () => {
  const data = useSelector((state) => state.authentication_user)
  console.log(data,"kk");
  return (
    <LoginForm/>
  )
}

export default Login
