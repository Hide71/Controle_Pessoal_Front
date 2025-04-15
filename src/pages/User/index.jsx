import {  addUser} from "../../services/userContoller"
import { useState,} from "react"
import { Link, useNavigate} from 'react-router-dom'


function User() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
  
    const handleSubmit = async (e)=> {
      e.preventDefault()
      if(!name || !email || !password){

        setError("por favor preencha todos os campos")
        alert("por favor preencha todos os campos")
        return
      }
      setIsLoading (true)
      setError("")
      try {
        const data = { name, email, password}
        setUsers(data)
        await addUser(data)
        alert("Cadastro efetuado com sucesso!");
        navigate("/");
        
      } catch (error) {
        
      }
      finally{
        setIsLoading(false)
      }
    }
    return(
      <div className="center-div">
        <div className="containerlogin"></div>
        <form onSubmit={handleSubmit}>
          <h1>Cadastro de usuários</h1>
          <div className="input-field">
            <input
              type="name"
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="input-field">
            <input
              type="email"
              placeholder="E-Mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-field">
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Cadastrando..." : "Cadastrar"}
          </button>
          <Link to={"/"} className="button"> voltar</Link>
          
        </form>

      </div>
    )

  }  
export default User
