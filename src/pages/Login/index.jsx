import { userLogin } from "../../services/userContoller";
import { GoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import ErrorBoundary from "../../services/ErrorBoundary";

function Login() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);

    if (!email || !password) {
      setError("Por favor, preencha todos os campos.")
      setIsLoading(false);
      return
    }

    try {
      const data = await userLogin({ userName, email, password });

      if (data.access_token) {
        localStorage.setItem("access_token", data.access_token);
        alert(" usuario logado  com Sucesso!!");
        navigate("/despesa");
      } else {
        setError("Usuário, Email ou senha inválidos.");
      }
    } catch (error) {
      console.error("Erro ao tentar fazer login:", error);
      alert("Erro ao tentar fazer login, usuário não está cadastrado.")
      setError("Erro ao tentar fazer login, usuário não está cadastrado.");

    } finally {
      setIsLoading(false);
    }    
  };

  const handleGoogleLoginSuccess = async (response) => {
    try {
      const { credential } = response; // O token do Google
      const result = await userLogin({
        email: "googleAuth",
        password: credential,
      });

      if (result.access_token) {
        localStorage.setItem("access_token", result.access_token);
        navigate("/despesa");
      } else {
        setError("Erro ao autenticar com o Google.");
      }
    } catch (error) {
      console.error("Erro ao tentar fazer login com o Google:", error);
      setError("Erro ao tentar fazer login com o Google.");
    }
  };
  
  const handleGoogleLoginFailure = (error) => {
    console.error("Erro no login com o Google:", error);
    setError(`Erro no Google Login: ${error.message || "Erro desconhecido"}`);
  };

  return (
    <div className="center-div">
      <div className="containerlogin">
        <form onSubmit={handleSubmit}>
          <h1>Acesse o sistema</h1>
          <div className="input-field">
            <input
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
            {isLoading ? "Entrando..." : "Entrar"}
          </button>
        </form>
        <div className="signup-link">
            <p>
              Não tem uma conta? <Link to="/usuario">Registrar</Link>
            </p>
            <div className="container">
              {/* <ErrorBoundary>
                <GoogleLogin
                  clientId="313667901167-d9cq0716r9ioll9uqdmf2qfa8nop0juv.apps.googleusercontent.com"
                  onSuccess={handleGoogleLoginSuccess}
                  onError={handleGoogleLoginFailure}
                  useOneTap
                />
              </ErrorBoundary> */}
            </div>
          </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
}

export default Login;
