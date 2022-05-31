import {useEffect, useState} from 'react'
import {Link, useParams} from 'react-router-dom';
import Alerta from '../components/Alerta';
import clienteAxios from '../config/axios';

const NuevoPassword = () => {
    const [alerta, setAlerta] = useState({});
    const [password, setPassword] = useState('');
    const params = useParams();
    const {token} = params;
    const [tokenValido, setTokenValido] = useState(false);
    
    useEffect(() => {
        const validarToken = async () => {
            try {
                const url = `/veterinarios/reestablecer-password/${token}`;
                await clienteAxios(url);
                setAlerta({msg: 'Coloca tu nuevo Password'});
                setTokenValido(true)
            } catch (error) {
                setAlerta({
                    msg:'Hubo un error con el enlace',
                    error: true
                })
            }
        }

        validarToken();
    },[])

   const {msg} = alerta;

   const handleSubmit = async (e) => {
       e.preventDefault();

       if(password === '' || password.length <= 6){
           setAlerta({msg: 'Password obligatorio o muy corto', error: true});
           return;
       }

       try {
           const url = `/veterinarios/reestablecer-password/${token}`
           const {data} = await clienteAxios.post(url, {password})
           setAlerta({msg: data.msg, error: false})
       } catch (error) {
           setAlerta({msg: error.response.data.msg, error: true})
       }
   }


    return (
        <>
            <div>
                <h1 className='text-indigo-600 font-bold text-6xl'>Reestablece tu password y no pierdas a tus <span className='text-black'>Pacientes</span></h1>
            </div>
            <div className='shadow-lg px-5 py-10 rounded-xl bg-white' >
                {msg && <Alerta 
                    alerta={alerta}
                />}
                {tokenValido &&  
                <form onSubmit = {handleSubmit}>
                    <div>
                    <label htmlFor="" className='text-gray-600 font-bold uppercase block'>Nuevo Password</label>
                    <input 
                        type="password" 
                        placeholder='Tu Nuevo Password' 
                        className='w-full p-3 border bg-gray-50 rounded-xl'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    </div>
                    <input type="submit" value="Enviar"  className='bg-indigo-700 w-100 text-white font-bold p-4 rounded-xl uppercase mt-3 hover:cursor-pointer md:w-auto'/>
                </form>}
            
                <nav className='mt-10 lg:flex lg:justify-between'>
                    <Link to='/registrar' className='text-gray-500'>Aun no tienes una cuenta? Registrate</Link>
                </nav> 
            </div>
        </>
    )
}

export default NuevoPassword