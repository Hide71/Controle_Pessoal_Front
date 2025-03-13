import api from "../services/api"

export const getUsers = async () => {
    try {
      const response = await api.get("v1/user");
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  };
  
  export const getUserById = async (id) => {
    try {
      const response = await api.get(`${"v1/user"}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching user with ID ${id}:`, error);
      throw error;
    }
  };
  
  export const addUser = async (user) => {
    try {
      const response = await api.post("v1/user", user);
      return response.data;
    } catch (error) {
      console.error('Error adding user:', error);
      throw error;
    }
  };
  
  export const editUser = async (id, user) => {
    try {
      const response = await api.put(`${"v1/user"}/${id}`, user);
      return response.data;
    } catch (error) {
      console.error(`Error editing user with ID ${id}:`, error);
      throw error;
    }
  };
export const deleteUser = async (id) => {
    try {
      // Fazendo a requisição DELETE para excluir o usuário
      const response = await api.delete(`${"v1/user"}/${id}`);
      return response.data; // Retorna a resposta da API, geralmente um status de sucesso
    } catch (error) {
      console.error(`Error deleting user with ID ${id}:`, error);
      throw error; // Lança o erro para ser tratado no componente
    }
  };
  