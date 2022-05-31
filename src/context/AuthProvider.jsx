import {createContext, useState, useEffect } from 'react';
import clienteAxios from '../config/axios';

const AuthContext = createContext();

const AuthProvider = ({children}) => {

    const [auth, setAuth] = useState({});
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const autenticar = async () => {
            const token = localStorage.getItem('token');

            if(!token) {
                setCargando(false);
                return;
            }

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const url = '/veterinarios/perfil'
                const { data } = await clienteAxios(url, config);
                setAuth(data)
            } catch (error) {
                console.log(error.response.data.msg);
                setAuth({});
            }

            setCargando(false);
        }
        autenticar();
    }, [])

    const cerrarSesion = () => {
        localStorage.removeItem('token');
        setAuth({});
    }

    return (
        <AuthContext.Provider value = {{
            auth,
            setAuth,
            cargando,
            cerrarSesion
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
};

export default AuthContext;