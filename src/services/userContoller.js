import api from "./api"

export const getUsers = async () => {
    try {
      const response = await api.get("v1/user")
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar usuários:', error)
      throw error;
    }
  }
  
  export const getUserById = async (id) => {
    try {
      const response = await api.get(`${"v1/user"}/${id}`)
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar usuário por Id: ${id}:`, error)
      throw error;
    }
  }
  
  export const addUser = async (user) => {
    try {
      const response = await api.post("v1/user", user)
      return response.data;
    } catch (error) {
      console.error('Erro ao adicionar usuario:', error)
      throw error;
    }
  }
  
  export const editUser = async (id, user) => {
    try {
      const response = await api.put(`${"v1/user"}/${id}`, user)
      return response.data;
    } catch (error) {
      console.error(`Erro ao editar usuário ${id}:`, error)
      throw error;
    }
  }
  export const userLogin = async (user) => {
    try {
      const response = await api.post("v1/user/login", user);
      return response.data;
    } catch (error) {
      if (error.response) {
        // Erro do backend (como 401 ou 500)
        throw error;
      } else if (error.request) {
        // Requisição feita mas sem resposta
        throw new Error("Sem resposta do servidor.");
      } else {
        // Algo deu errado ao configurar a requisição
        throw new Error("Erro ao enviar requisição.");
      }
    }
  };
  
