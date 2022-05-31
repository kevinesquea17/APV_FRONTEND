import { useContext } from 'react';
import PacientesContext from '../context/PacientesProvider';
import Paciente from './Paciente';

const ListadoPacientes = () => {

  console.log('listado');
  const {pacientes, loading} = useContext(PacientesContext);

  if(loading) return 'Cargando...';
  
  
  return (
    <>
     {pacientes.length > 0  ? (
        <>
          <h2 className='font-black text-3xl text-center'>Listado de Pacientes</h2>
          <p className='text-xl mt-5 mb-10 text-center'>
            Administra tus {''}
            <span className='text-indigo-600 font-bold'>pacientes y citas</span>
          </p>
          {pacientes.map(paciente => (
            <Paciente
              key={paciente._id}
              paciente={paciente}
            />          
          )) 
          }
        </>
          ) :
        (
        <>
          <h2 className='font-black text-3xl text-center'>No Hay Pacientes</h2>
          <p className='text-xl mt-5 mb-10 text-center'>
            Comienza agregando pacientes {''}
            <span className='text-indigo-600 font-bold'>y apareceran en este lugar</span>
          </p>
        </>
        )
      }
    </>
  )
}

export default ListadoPacientes