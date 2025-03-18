import React from 'react'
import '../AppRoutes/style.css'
import { Link } from 'react-router-dom'

function Login(){
    return(
        <div>
            <h1> Tela de Login</h1>
            <Link to={'/usuario'}className='button'>Usuarios</Link>
            <Link to={'/categoria'}className='button'>Categoria</Link>
            <Link to={'/account'} className='button'> Conta</Link>
            <Link to={'/despesa'}className='button'>Despesas</Link>
        </div>
    )
}
export default Login