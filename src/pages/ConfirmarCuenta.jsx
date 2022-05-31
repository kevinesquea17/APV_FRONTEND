import {useEffect, useState} from 'react'
import {useParams, Link} from 'react-router-dom';
import clienteAxios from '../config/axios';
import Alerta from '../components/Alerta';

const ConfirmarCuenta = () => {
  const [alerta, setAlerta] = useState({});
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
  const [cargando, setCargando] = useState(true);
  const params = useParams();
  const {token} = params;

  useEffect(() => {
      const confirmarCuenta = async () => {
        try {
          const url = `/veterinarios/confirmar/${token}`
          const {data} = await clienteAxios(url);
          setCuentaConfirmada(true);
          setAlerta({msg: data.msg, error: false})
        } catch (error) {
            setAlerta({msg: error.response.data.msg, error: true})
        }

        setCargando(false);
      }

      confirmarCuenta();
  },[])

 
  return (
    <>
       <div>
          <h1 className='text-indigo-600 font-bold text-6xl'>Confirma tu cuenta y Administra tus <span className='text-black'>Pacientes</span></h1>
        </div>
        <div className='shadow-lg px-5 py-10 rounded-xl bg-white' >
            {!cargando && <Alerta 
              alerta={alerta}
            />}

            {cuentaConfirmada &&  
            <nav className='mt-10 lg:flex lg:justify-between'>
              <Link to='/' className='text-gray-500'>Ya tienes una cuenta? Inicia Sesión</Link>
              <Link to='/olvide-password' className='text-gray-500'>Olvide mi password</Link>
            </nav> }
        </div>
    </>
  )
}

export default ConfirmarCuenta;