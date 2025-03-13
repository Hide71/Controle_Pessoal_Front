import { getUsers, getUserById, addUser, editUser,deleteUser  } from "../../services/userContoller"
import { useEffect, useState,} from "react"
import { Link } from 'react-router-dom'
//import './AppRoutes/style.css'

function User() {
    const [users, setUsers] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userUrl, setUserUrl] = useState('');
  
    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const data = await getUsers();
          setUsers(data);
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      };
  
      fetchUsers();
    }, []);
  
    const handleOpenModal = (user = null) => {
      if (user) {
        setCurrentUser(user);
        setUserName(user.username);
        setUserEmail(user.email);
        setUserUrl(user.url);
      } else {
        setCurrentUser(null);
        setUserName('');
        setUserEmail('');
        setUserUrl('');
      }
      setModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setModalOpen(false);
    };
  
    const handleSave = async () => {
      const user = { username: userName, email: userEmail, url:userUrl };
      try {
        if (currentUser) {
          await editUser(currentUser.id, user);
        } else {
          await addUser(user);
        }
        const data = await getUsers();
        setUsers(data);
        handleCloseModal();
      } catch (error) {
        console.error('Error saving user:', error);
      }
    };
    const handleDelete = async (id) => {
        try {
          await deleteUser(id);
          const data = await getUsers();
          setUsers(data);
        } catch (error) {
          console.error('Error deleting user:', error);
        }
      };
  
    return (
        <div className="container">
          <h1>Usuários Cadastrados</h1>
          <button onClick={() => handleOpenModal()}>Adicionar Usuário</button>
          <th>
             <Link to={'/'} className="button">Login</Link>
             <Link to={'/categoria'}className="button">Categoria</Link>
             <Link to={'/despesa'} className="button">Despesa</Link>
          </th>
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
    
          {/* Modal logic can be placed here */}
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
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                placeholder="Email"
              />
              <input
                type="text"
                value={userUrl}
                onChange={(e) => setUserUrl(e.target.value)}
                placeholder="URL"
              />
              <button onClick={handleSave}>Salvar</button>
              <button onClick={handleCloseModal}>Fechar</button>
            </div>
          )}
        </div>
      );
    }
  
export default User
