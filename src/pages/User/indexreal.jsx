import api from "../../services/api"
import { useEffect, useState, useRef } from "react"
import './style.css'

function User() {
  const[users, setUsers]  = useState([]) 

  const inputName = useRef()
  const inputEmail = useRef()
  const inputUrl = useRef()

  async function getUsers(){
    const usersFromApi = await api.get("v1/user")
    setUsers(usersFromApi.data)
  }

  async function createUser(){
    await api.post("v1/user", 
      { username: inputName.current.value,
        email: inputEmail.current.value,
        url: inputUrl.current.value

      })
      getUsers()
  }

  useEffect(() => {
    getUsers()

  },[]
)


  return (
    
    <div className='container'>
      <form>
        <h1>Cadastro de Usuarios</h1>
        <input placeholder= "Nome" type="text" name='nome'ref={inputName} />
        <input placeholder= "E-mail"type="email" name='email' ref={inputEmail} />
        <input placeholder= "URL"type="text" name='url' ref={inputUrl}/>
        <button type="button" onClick={createUser}>Cadastrar</button>
      </form>
      {users.map((user) => (
        <div key={user.id}>
          <div className="card">
            <p>Nome: <span>{user.username}</span></p>
            <p>Email: <span>{user.email}</span></p>
            <p>URL: <span>{user.url}</span></p>
          </div>
          <button type="button">Excluir</button>
        </div>
      ))}  
    </div>           
    
  )
}

export default User