import { userLogin } from "../../services/userContoller"
import { useState } from 'react'
import { Link , useNavigate} from 'react-router-dom'
import './style.css'

function Login() {
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if ( !userName || !email || !password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const data = await userLogin({userName, email, password });

      if (data.access_token) {
        localStorage.setItem('access_token', data.access_token);
        alert("Sucesso!!")
        navigate('/usuario');
      } else {
        setError('Usuário, Email ou senha inválidos.');
      }
    } catch (error) {
      console.error('Erro ao tentar fazer login:', error);
      setError('Erro ao tentar fazer login, usuário não está cadastrado.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="center-div">
      <div className="containerlogin">
        <form onSubmit={handleSubmit}>
          <h1>Acesse o sistema</h1>
          <div className="input-field">
            <input
              type="text"
              placeholder="Nome"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
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
            {isLoading ? 'Entrando...' : 'Entrar'}
          </button>
          <div className="signup-link">
            <p>
              Não tem uma conta? <Link to="/usuario">Registrar</Link>
            </p>
          </div>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
  );
}

export default Login;
