import React, { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const [userPicture, setUserPicture] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    navigate("/");
  };

  useEffect(() => {
    const token = localStorage.getItem('access_token');

    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserPicture(decoded.picture);
        setUserName(decoded.name);
        setUserEmail(decoded.email);
      } catch (error) {
        console.error('Erro ao decodificar o token:', error);
      }
    } else {
      console.log('Token de acesso não encontrado');
    }
  }, []);

  return (
    <div style={{ textAlign: "left", marginTop: '20px' }}>
      {userPicture ? (
        <img
          src={userPicture}
          alt="Foto de perfil do usuário"
          style={{ width: '50px', height: '50px', borderRadius: '50%', marginBottom: '10px' }}
        />
      ) : (
        <div>Carregando foto...</div>
      )}
      <h2>{userName || 'Nome do Usuário'}</h2>
      <p>{userEmail || 'Email do Usuário'}</p>
      <button 
        onClick={handleLogout} 
        style={{
          marginTop: '15px',
          padding: '10px 20px',
          backgroundColor: '#e63946',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default UserProfile;
