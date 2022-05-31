import {useState} from 'react'
import Alerta from '../components/Alerta'
import {Link, useNavigate} from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import clienteAxios from '../config/axios'

const Login = () => {

  const {setAuth} = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alerta, setAlerta] = useState({})

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(email === ''){
      setAlerta({msg: 'El email es obligatorio', error: true});
      return;
    }

    if(password === ''){
      setAlerta({msg: 'El password es obligatorio', error: true});
      return;
    }


    try {
      const url = '/veterinarios/login';
      const {data} = await clienteAxios.post(url, {email, password})
      localStorage.setItem('token', data.token);
      setAuth(data)
      navigate('/admin');
    } catch (error) { 
      setAlerta({
        msg: error.response.data.msg,
        error:true
      })
    }

  }

  const {msg} = alerta;

  return (
    <>
        <div>
          <h1 className='text-indigo-600 font-bold text-6xl'>Inicia Sesión y Administra tus <span className='text-black'>Pacientes</span></h1>
        </div>
        <div className='shadow-lg px-5 py-10 rounded-xl bg-white' >
          {msg && <Alerta 
            alerta={alerta}
          />}
          <form action="" onSubmit = {handleSubmit}>
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
            <div className='my-10'>
              <label htmlFor="" className='text-gray-600 font-bold uppercase block'>Password</label>
              <input 
                type="password" 
                placeholder='Tu password' 
                className='w-full p-3 border bg-gray-50 rounded-xl'
                value={password}
                onChange={e => setPassword(e.target.value)} 
              />
            </div>

            <input type="submit" value="Iniciar Sesión"  className='bg-indigo-700 w-100 text-white font-bold p-4 rounded-xl uppercase mt-3 hover:cursor-pointer md:w-auto'/>
          </form>

          <nav className='mt-10 lg:flex lg:justify-between'>
            <Link to='/registrar' className='text-gray-500'>Aun no tienes una cuenta? Registrate</Link>
            <Link to='/olvide-password' className='text-gray-500'>Olvide mi password</Link>
          </nav>
        </div>
    </>
  )
}

export default Login;