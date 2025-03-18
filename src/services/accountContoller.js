import api from "./api"

export const getAccounts = async () => {
    try {
      const response = await api.get("v1/account")
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar conta:', error)
      throw error;
    }
  }
  
  export const getAccountById = async (id) => {
    try {
      const response = await api.get(`${"v1/account"}/${id}`)
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar conta por Id: ${id}:`, error)
      throw error;
    }
  }
  
  export const addAccount = async (account) => {
    try {
      const response = await api.post("v1/account", account)
      return response.data;
    } catch (error) {
      console.error('Erro ao adicionar conta:', error)
      throw error;
    }
  }
  
  export const editAccount = async (id, account) => {
    try {
      const response = await api.put(`${"v1/account"}/${id}`, account)
      return response.data;
    } catch (error) {
      console.error(`Erro ao editar conta ${id}:`, error)
      throw error;
    }
  }
export const deleteAccount = async (id) => {
    try {
      const response = await api.delete(`${"v1/account"}/${id}`)
      return response.data; 
    } catch (error) {
      console.error(`Erro ao deletar conta ${id}:`, error)
      throw error; 
    }
  }
  