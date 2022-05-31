import React from 'react'

const Alerta = ({alerta}) => {
  return (
    <div className={`${alerta.error ? 'from-red-400 to-red-600' : 'from-indigo-400 to-indigo-600'} bg-gradient-to-r p-3 text-white font-bold text-center mb-5 rounded-xl uppercase`}>
        {alerta.msg}
    </div>
  )
}

export default Alerta