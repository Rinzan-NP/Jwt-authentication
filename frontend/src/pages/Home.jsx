// Home.js
import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const Home = () => {
  let {user} = useContext(AuthContext)
 
  return (
    <>
    {user ? <h1>{user.username}</h1> : <h1>Hello</h1>}
    </>
  );
};

export default Home;


