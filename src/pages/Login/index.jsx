import './style.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'

function Login(){
    const[userName, setUserName]= useState("")
    const[passWord, setPassWord] = useState("")

    const handleSubmit = (event) =>{
        event.preventDefault()
        alert("enviando os dados:" + userName + "-" + passWord )
    }
    return (
        <div className='center-div'>
            <div className='containerlogin'>
                <form onSubmit={handleSubmit}>
                    <h1>Acesse o sistema</h1>
                    <div className='input-field'>
                        <input type="email" placeholder='E-Mail'
                            onChange={(e) => setUserName(e.target.value)} />
                    </div>
                    <div className='input-field'>
                        <input type="password" placeholder='Senha'
                            onChange={(e) => setPassWord(e.target.value)} />
                    </div>
                    <div className='recall-forget'>
                        <label>
                            <input type="checkbox"/>
                            Lembre de mim
                        </label>
                        <Link to={'#'}>Esqueceu a senha?</Link>
                    </div>
                    <button>Entrar</button>
                    <div className='signup-link'>
                        <p>
                            Não tem uma conta? <Link to={'#'}>Registrar</Link>
                        </p>
                        <Link to={'/usuario'} className='button'>Usuarios</Link>
                        <Link to={'/categoria'} className='button'>Categoria</Link>
                        <Link to={'/conta'} className='button'>Conta</Link>
                        <Link to={'/despesa'} className='button'>Despesas</Link>
                    </div>
                </form>
            </div>
        </div>       

    )
}
export default Login