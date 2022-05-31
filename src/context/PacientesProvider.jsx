import { createContext, useState, useEffect } from "react";
import clienteAxios from "../config/axios";

const PacientesContext = createContext();

const PacientesProvider = ({children}) => {

    const [pacientes, setPacientes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [paciente, setPaciente] = useState({});
    
   
    useEffect(() => {
        const obtenerPaciente = async () => {
            try {
                const token = localStorage.getItem('token');
                if(!token) return;
                const url = '/pacientes';
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const {data} = await clienteAxios(url,config);
                setPacientes(data);
            } catch (error) {
                console.log(error.response.data.msg);
            }

            setLoading(false);
        }
        obtenerPaciente();
        console.log('Render')
    },[])

    const guardarPaciente = async (paciente) => {

        const token = localStorage.getItem('token');
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        if(paciente.id){
            try {
                const url = `/pacientes/${paciente.id}`;
                const {data} = await clienteAxios.put(url, paciente, config);
                const pacientesActualizado = pacientes.map(pacienteState => pacienteState._id === data._id ? data : pacienteState);
                setPacientes(pacientesActualizado);
            } catch (error) {
                console.log(error.response.data.msg)
            }
        }else{
            try {
                const url = '/pacientes';
                const {data} = await clienteAxios.post(url, paciente, config)
                const {createdAt, updatedAt, __v, ...pacienteAlmacenado} = data;
                setPacientes([pacienteAlmacenado, ...pacientes]);
            } catch (error) {
                console.log(error.response.data.msg)
            }
        }
    }

    const setEdicion = (paciente) => {
        setPaciente(paciente)
    }

    const limpiarPacientes = () => {
        setPacientes([]);
    }

    const eliminarPaciente = async id => {
        const confirmar = confirm('¿Estas seguro que deseas eliminar el registro?')

        if(confirmar){
            try {
                const url = `/pacientes/${id}`;
                const token = localStorage.getItem('token');
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const {data} = await clienteAxios.delete(url, config);
                console.log(data);
                const pacientesActualizado = pacientes.filter(pacienteState => pacienteState._id !== id);
                setPacientes(pacientesActualizado);
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <PacientesContext.Provider value = {{
            pacientes,
            guardarPaciente,
            limpiarPacientes, 
            loading,
            setEdicion, 
            paciente,
            eliminarPaciente      
        }}>
            {children}
        </PacientesContext.Provider>
    )
}


export {
    PacientesProvider
}

export default PacientesContext;