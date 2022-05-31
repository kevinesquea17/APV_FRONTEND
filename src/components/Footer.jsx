import React from 'react'

const Footer = () => {

  console.log('Footer');

  return (
    <footer className='py-10 bg-indigo-600 mt-8'>
        <p className='text-center font-bold text-white'>APV - Administrador de Pacientes de {''} 
            <span className='font-black text-white'>Veterinaria</span>
        </p>
    </footer>
  )
}

export default Footer