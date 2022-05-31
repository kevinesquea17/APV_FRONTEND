import { useState } from 'react'
import {Link} from 'react-router-dom';
import Alerta from '../components/Alerta';
import clienteAxios from '../config/axios';

const OlvidePassword = () => {

  const [email, setEmail] = useState('');
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(email === ''){
      setAlerta({msg: 'El campo E-mail es obligatorio', error: true})
      return;
    }

    try {
      const url = '/veterinarios/olvide-password';
      const {data} = await clienteAxios.post(url, {email})
      setAlerta({msg: data.msg, error: false});
    } catch (error) { 
      setAlerta({msg: error.response.data.msg, error: true});
    }
  }

  const {msg} = alerta;

  return (
    <>
        <div>
          <h1 className='text-indigo-600 font-bold text-6xl'>Reestablece tu password y no pierdas a tus <span className='text-black'>Pacientes</span></h1>
        </div>
        <div className='shadow-lg px-5 py-10 rounded-xl bg-white' >
          {msg && <Alerta 
              alerta={alerta}
          />}
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="" className='text-gray-600 font-bold uppercase block'>Email</label>
              <input 
                type="email" 
                placeholder='Tu Email' 
                className='w-full p-3 border bg-gray-50 rounded-xl'
                value={email}
                onChange={e => setEmail(e.target.value)}
               />
            </div>
            <input type="submit" value="Enviar instrucciones"  className='bg-indigo-700 w-100 text-white font-bold p-4 rounded-xl uppercase mt-3 hover:cursor-pointer md:w-auto'/>
          </form>

          <nav className='mt-10 lg:flex lg:justify-between'>
            <Link to='/registrar' className='text-gray-500'>Aun no tienes una cuenta? Registrate</Link>
          </nav> 
        </div>    
    </>
  )
}

export default OlvidePassword