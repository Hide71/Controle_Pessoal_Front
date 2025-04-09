import React, { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";
import { useNavigate} from 'react-router-dom';

const UserProfile = () => {
  // Estado para armazenar o nome e a foto do usuário
  const [userPicture, setUserPicture] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    navigate("/")
  };

  useEffect(() => {
    // Recupera o access_token do localStorage
    const token = localStorage.getItem('access_token');

    if (token) {
      try {
        // Decodifica o token JWT
        const decoded = jwtDecode(token);

        // Extrai o nome e a foto do usuário do payload
        setUserPicture(decoded.picture);
        setUserName(decoded.name);
        setUserEmail(decoded.email)
      } catch (error) {
        console.error('Erro ao decodificar o token:', error);
      }
    } else {
      console.log('Token de acesso não encontrado');
    }
  }, []);

  return (
    <div>
      {userPicture ? (
        <img 
          src={userPicture} 
          alt="Foto de perfil do usuário" 
          style={{ width: '50px', height: '50px', borderRadius: '50%' }} 
          onClick={handleLogout}
        />
      ) : (
        <div>Carregando foto...</div>
      )}
      <h2>{userName || 'Nome do Usuário'}</h2>
      <h2>{userEmail || 'email do Usuário'}</h2>
    </div>
  );
};

export default UserProfile;
