import {useState, useEffect, useContext} from 'react'
import PacientesContext from '../context/PacientesProvider';
import Alerta from './Alerta';

const Formulario = () => {

  console.log('formulario');
  const [nombre, setNombre] = useState('');
  const [propietario, setPropietario] = useState('')
  const [email, setEmail] = useState('')
  const [fecha, setFecha] = useState('')
  const [sintomas, setSintomas] = useState('');
  const [id, setId] = useState(null);
  const [alerta, setAlerta] = useState({});


  const {guardarPaciente, paciente} = useContext(PacientesContext);

  useEffect(() => {
    if(paciente?.nombre){
      setNombre(paciente.nombre)
      setPropietario(paciente.propietario)
      setEmail(paciente.email)
      setFecha(paciente.fecha)
      setSintomas(paciente.sintomas)
      setId(paciente._id)
    }
  }, [paciente])

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(nombre === ''){
      setAlerta({msg: 'El nombre de la mascota es obligatorio', error: true})
      return;
    }

    if(propietario === ''){
      setAlerta({msg: 'El nombre del propietario es obligatorio', error: true})
      return;
    }

    if(email === ''){
      setAlerta({msg: 'El email del propietario es obligatorio', error: true})
      return;
    }

     if(fecha === ''){
      setAlerta({msg: 'El email del propietario es obligatorio', error: true})
      return;
    }

    if(sintomas === ''){
      setAlerta({msg: 'Los sintomas son obligatorio', error: true})
      return;
    }

    guardarPaciente({nombre,propietario,email,fecha, sintomas, id});
    
  }

  

  const {msg} = alerta;

  return (
    <>
      <h2 className='font-black text-3xl text-center'>Administrador de Pacientes</h2>
      <p className='text-xl mt-5 mb-10 text-center'>
            Añade a tus pacientes y {''}
            <span className='text-indigo-600 font-bold'>Administralos</span>
      </p>

      {msg && <Alerta 
        alerta={alerta}
      />}

      <form action="" onSubmit = {handleSubmit} className='p-8 bg-white rounded-md mb-10 lg:mb-0 shadow-xl'>
        <div className="mb-5">
          <label 
            htmlFor="mascota"
            className='font-bold text-gray-500 uppercase'
          >Nombre Mascota</label>
          <input 
            type="text" 
            id="mascota"
            placeholder='Nombre de la Mascota'
            className='border-2 w-full p-2 mt-2 rounded-xl placeholder-gray-400 border-gray-400'
            value={nombre}
            onChange={e => setNombre(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label 
            htmlFor="propietario"
            className='font-bold text-gray-500 uppercase'
          >Nombre Propietario</label>
          <input 
            type="text" 
            id="propietario"
            placeholder='Nombre del Propietario'
            className='border-2 w-full p-2 mt-2 rounded-xl placeholder-gray-400 border-gray-400'
            value={propietario}
            onChange={e => setPropietario(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label 
            htmlFor="email"
            className='font-bold text-gray-500 uppercase'
          >Email del Propietario</label>
          <input 
            type="email" 
            id="email"
            placeholder='Email del Propietario'
            className='border-2 w-full p-2 mt-2 rounded-xl placeholder-gray-400 border-gray-400'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label 
            htmlFor="fecha"
            className='font-bold text-gray-500 uppercase'
          >Fecha Alta</label>
          <input 
            type="date" 
            id="fecha"
            className='border-2 w-full p-2 mt-2 rounded-xl text-gray-400 border-gray-400'
            value={fecha}
            onChange={e => setFecha(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label 
            htmlFor="sintomas"
            className='font-bold text-gray-500 uppercase'
          >Sintomas</label>
          <textarea
            id="sintomas"
            placeholder='Describe los sintomas'
            className='border-2 w-full p-2 mt-2 rounded-xl placeholder-gray-400 border-gray-400'
            value={sintomas}
            onChange={e => setSintomas(e.target.value)}
          />
        </div>

        <input 
          type="submit" 
          value= {id ? 'Guardar Cambios' : 'Agregar Paciente'}
          className='bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-800 cursor-pointer transition-color'  
        />
      </form>
    </>
  )
}

export default Formulario