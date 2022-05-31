import React, {useContext} from 'react'
import PacientesContext from '../context/PacientesProvider';

const Paciente = ({paciente}) => {

    const {nombre, email, propietario, fecha, _id, sintomas} = paciente;
    const {setEdicion, eliminarPaciente} = useContext(PacientesContext);
    const formatearFecha = (fecha) => {
        const nuevaFecha = new Date(fecha);
        return Intl.DateTimeFormat('es-ES', {dateStyle: 'long'}).format(nuevaFecha)
    }

    return (
        <div className='mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-xl'>
            <p className='font-bold uppercase text-indigo-600'>Nombre: {''} 
                <span className='font-normal normal-case text-black'>{nombre}</span>
            </p>
            <p className='font-bold uppercase text-indigo-600'>Propietario: {''}  
                <span className='font-normal uppercase text-black'>{propietario}</span>
            </p>

            <p className='font-bold uppercase text-indigo-600'>Email: {''}  
                <span className='font-normal uppercase text-black'>{email}</span>
            </p>

            <p className='font-bold uppercase text-indigo-600'>Fecha: {''}  
                <span className='font-normal uppercase text-black'>{formatearFecha(fecha)}</span>
            </p>

            <p className='font-bold uppercase text-indigo-600'>Sintomas: {''}  
                <span className='font-normal uppercase text-black'>{sintomas}</span>
            </p>

            <div className='flex gap-4'>
                <button 
                    className='py-2 px-10 bg-indigo-600 mt-5 text-white font-bold uppercase rounded-md' 
                    type='button'
                    onClick={() => setEdicion(paciente)}
                >Editar</button>
                 <button 
                    className='py-2 px-10 bg-red-600 mt-5 text-white font-bold uppercase rounded-md' 
                    type='button'
                    onClick={() => eliminarPaciente(_id)}
                >Eliminar</button>
            </div>
        </div>
    )
}

export default Paciente