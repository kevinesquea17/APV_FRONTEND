import React from 'react'
import {Outlet, Navigate} from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import useAuth from '../hooks/useAuth';
import { PacientesProvider } from '../context/PacientesProvider';

const RutaProtegida = () => {

  const {auth, cargando} = useAuth();
  if(cargando) return 'cargando...';

  return (
    <PacientesProvider>
        <Header/>
        { auth?._id ? 
        <main className='container mx-auto mt-10'>
          <Outlet />
        </main>   : 
        <Navigate to="/" /> } 
        <Footer/>
    </PacientesProvider>
  )
}

export default RutaProtegida