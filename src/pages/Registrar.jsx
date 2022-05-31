import {useState} from 'react'
import { Link } from 'react-router-dom';
import Alerta from '../components/Alerta';
import clienteAxios from '../config/axios';

const Registrar = () => {

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repetirPassword, setRepetirPassword] = useState('');
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    if([nombre, email, password, repetirPassword].includes('')){
      setAlerta({msg: 'Hay campos vacios', error: true});
      return;
    }

    if(password !== repetirPassword){
      setAlerta({msg: 'las contraseñas son diferentes', error: true});
      return;
    }

    if(password.length < 6){
      setAlerta({msg: 'La contraseña es muy corta, debe ser al menos 6 caracteres', error: true});
      return;
    }

    setAlerta({});

    try {
      const url = '/veterinarios';
      await clienteAxios.post(url, {nombre, email, password});
      setAlerta({msg: 'Creado correctamente, revisa tu E-mail', error: false})
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  const {msg} = alerta;

  return (
    <>
        <div>
          <h1 className='text-indigo-600 font-bold text-6xl'>Registrate y Administra tus <span className='text-black'>Pacientes</span></h1>
        </div>
        <div className='shadow-lg px-5 py-10 rounded-xl bg-white' >
          { msg && <Alerta 
              alerta={alerta}
          /> }
          <form onSubmit = {handleSubmit}>
            <div>
              <label htmlFor="" className='text-gray-600 font-bold uppercase block'>Nombre</label>
              <input 
                type="text" 
                placeholder='Tu Nombre' 
                className='w-full p-3 border bg-gray-50 rounded-xl'
                value={nombre}
                onChange={(e) => setNombre(e.target.value)} 
              />
            </div>
            <div className='my-10'>
              <label htmlFor="" className='text-gray-600 font-bold uppercase block'>Email</label>
              <input 
                type="email" 
                placeholder='Tu Email' 
                className='w-full p-3 border bg-gray-50 rounded-xl'
                value={email}
                onChange={(e) => setEmail(e.target.value)}  
              />
            </div>
            <div className='my-10'>
              <label htmlFor="" className='text-gray-600 font-bold uppercase block'>Password</label>
              <input 
                type="password" 
                placeholder='Tu password' 
                className='w-full p-3 border bg-gray-50 rounded-xl'
                value={password}
                onChange={(e) => setPassword(e.target.value)}  
              />
            </div>
            <div className='my-10'>
              <label htmlFor="" className='text-gray-600 font-bold uppercase block'>Repetir Password</label>
              <input 
                type="password" 
                placeholder='Repite tu password' 
                className='w-full p-3 border bg-gray-50 rounded-xl'
                value={repetirPassword}
                onChange={(e) => setRepetirPassword(e.target.value)} 
              />
            </div>

            <input type="submit" value="Registrar"  className='bg-indigo-700 w-100 text-white font-bold p-4 rounded-xl uppercase mt-3 hover:cursor-pointer md:w-auto'/>
          </form> 

          <nav className='mt-10 lg:flex lg:justify-between'>
            <Link to='/' className='text-gray-500'>Ya tienes una cuenta? Inicia Sesión</Link>
            <Link to='/olvide-password' className='text-gray-500'>Olvide mi password</Link>
          </nav> 
        </div>    
    </>
  )
}

export default Registrar