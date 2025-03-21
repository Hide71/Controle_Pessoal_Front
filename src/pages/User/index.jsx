import { getUsers, getUserById, addUser, editUser,deleteUser  } from "../../services/userContoller"
import { useEffect, useState,} from "react"
import { Link } from 'react-router-dom'

function User() {
    const [users, setUsers] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
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
        setUrl(user.url)
      } else {
        setCurrentUser(null)
        setUserName('')
        setEmail('')
        setUrl('')
      }
      setModalOpen(true)
    }
  
    const handleCloseModal = () => {
      setModalOpen(false)
    }
  
    const handleSave = async () => {
      const user = { username: userName, email: email, url: url }
      try {
        if (currentUser) {
          await editUser(currentUser.id, user)
        } else {
          await addUser(user)
        }
        const data = await getUsers()
        setUsers(data)
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
          <h1>Usuários</h1>
          <div className="center-div">
             <Link to={'/'} className="button">Login</Link>
             <Link to={'/categoria'} className="button">Categoria</Link>
             <Link to={'/conta'} className="button">Conta</Link>
             <Link to={'/despesa'} className="button">Despesa</Link>
             <button onClick={() => handleOpenModal()}>Adicionar Usuário</button>
          </div>
          <div className="container">
          {users.length > 0 ? (
            <table className="table">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>URL</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.url}</td>
                    <td>
                      <button onClick={() => handleOpenModal(user)}>Editar</button>
                      <button onClick={() => handleDelete(user.id)}>Excluir</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Nenhum usuário cadastrado.</p>
          )}
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
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="URL"
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
