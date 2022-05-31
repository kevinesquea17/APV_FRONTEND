import React, { useContext } from 'react'
import {Link} from 'react-router-dom';
import PacientesContext from '../context/PacientesProvider';
import useAuth from '../hooks/useAuth';


const Header = () => {

    console.log('Header');
    const {cerrarSesion, auth} = useAuth();
   
    
    return (
        <header className='py-10 bg-indigo-600 '>
            <div className='container mx-auto flex justify-between items-center'>
                <h1 className='text-white fonto-bold text-2xl'>
                    Administrador de Pacientes de {''}
                    <span className='text-indigo-200 font-black'>Veterinaria</span>
                </h1>

                <nav className='flex gap-4'>
                    <Link to='/' className='text-white text-md uppercase font-bold'>Pacientes</Link>
                    <Link to="perfil" className='text-white text-md uppercase font-bold'>Perfil</Link>
                    <h3  className='text-white text-md uppercase font-bold'>{auth._id ? `${auth.nombre}` : '' }</h3>
                    <button 
                        type='button' 
                        className='text-white text-md uppercase font-bold'
                        onClick={cerrarSesion}
                    >Cerrar sesión</button>
                </nav>
            </div>
        </header>
    )
}

export default Header