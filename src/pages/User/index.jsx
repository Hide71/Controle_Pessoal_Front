import { getUsers, getUserById, addUser, editUser,deleteUser  } from "../../services/userContoller"
import { useEffect, useState,} from "react"
import { Link, redirect } from 'react-router-dom'

function User() {
    const [users, setUsers] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [passWord, setPassWord] = useState('')
    const [url, setUrl] = useState('');
  
    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const data = await getUsers()
          setUsers(data)
        } catch (error) {
          console.error('Erro ao  buscar usuários:', error)
        }
      }
  
      fetchUsers()
    }, [])
  
    const handleOpenModal = (user = null) => {
      if (user) {
        setCurrentUser(user)
        setUserName(user.username)
        setEmail(user.email)
        setPassWord(user.password)
        setUrl(user.url)
      } else {
        setCurrentUser(null)
        setUserName('')
        setEmail('')
        setPassWord('')
        setUrl('')
      }
      setModalOpen(true)
    }
  
    const handleCloseModal = () => {
      setModalOpen(false)
    }
  
    const handleSave = async () => {
      const user = { username: userName, email: email,passWord: passWord, url: url }
      try {
        if (currentUser) {
          await editUser(currentUser.id, user)
        } else {
          await addUser(user)
        }
        const data = await getUsers()
        setUsers(data)
        window.location.href = '/'
        handleCloseModal()
      } catch (error) {
        console.error('Erro ao salvar usuario:', error)
      }
    }
    const handleDelete = async (id) => {
        try {
          await deleteUser(id)
          const data = await getUsers()
          setUsers(data)
        } catch (error) {
          console.error('Erro ao deletar usuario:', error)
        }
      }
    return (
        <div >
          <h1>Cadastro de Usuários</h1>
          <div className="center-div">
             <button onClick={() => handleOpenModal()}>Adicionar Usuário</button>
          </div>
          <div className="container">
          {modalOpen && (
            <div className="modal">
              <h2>{currentUser ? 'Editar Usuário' : 'Adicionar Usuário'}</h2>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Nome"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
              <input
                type="text"
                value={passWord}
                onChange={(e) => setPassWord(e.target.value)}
                placeholder="senha"
              />
              <button onClick={handleSave}>Salvar</button>
              <button onClick={handleCloseModal}>Fechar</button>
            </div>
          )}
    
          </div>   
        </div>
      )
    }
  
export default User
