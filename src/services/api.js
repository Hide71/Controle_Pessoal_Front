import axios from "axios"

//const api = axios.create({
    //baseURL: "http://localhost:5119"
//})
//export default api

const BASE_URL = "http://localhost:5119/v1/user"
export const getUsers = async () => {
    try {
      const response = await axios.get(BASE_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  };
  
  export const getUserById = async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching user with ID ${id}:`, error);
      throw error;
    }
  };
  
  export const addUser = async (user) => {
    try {
      const response = await axios.post(BASE_URL, user);
      return response.data;
    } catch (error) {
      console.error('Error adding user:', error);
      throw error;
    }
  };
  
  export const editUser = async (id, user) => {
    try {
      const response = await axios.put(`${BASE_URL}/${id}`, user);
      return response.data;
    } catch (error) {
      console.error(`Error editing user with ID ${id}:`, error);
      throw error;
    }
  };
  // src/api/userApi.js
export const deleteUser = async (id) => {
    try {
      // Fazendo a requisição DELETE para excluir o usuário
      const response = await axios.delete(`${BASE_URL}/${id}`);
      return response.data; // Retorna a resposta da API, geralmente um status de sucesso
    } catch (error) {
      console.error(`Error deleting user with ID ${id}:`, error);
      throw error; // Lança o erro para ser tratado no componente
    }
  };
  