import {Navigate, Outlet } from 'react-router-dom'


function PrivateRoute({isLogged}){
    console.log('hi')
    return(
        isLogged ? <Outlet /> : <Navigate to="/login" />

    )
}

export default PrivateRoute