import api from "../../services/api"
import { useEffect, useState } from "react"
import './style.css'

function User() {
  const[user, setUsers]  = useState([]) 

  async function getUsers(){
    const usersFromApi = await api.get("v1/user")
    setUsers(usersFromApi.data)
  }

  useEffect(() => {
    getUsers()

  },[]
)


  return (
    
    <div className='container'>
      <form>
        <h1>Cadastro de Usuarios</h1>
        <input placeholder= "Nome" type="text" name='nome' />
        <input placeholder= "E-mail"type="email" name='email' />
        <input placeholder= "URL"type="text" name='url' />
        <button type="button">Cadastrar</button>
      </form>
      {user.map((user) => (
        <div>
        <div  key={user.Id} className="card"></div>
            <p>Nome: <span>{user.username}</span></p>
            <p>Email: <span>{user.email}</span> </p>
            <p>URL: <span>{user.url}</span></p>

        <div>

        </div>
        <button type="button">Excluir</button>

      </div>
      
      ))}  
    </div>           
    
  )
}

export default User
