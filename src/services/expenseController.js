import api from "./api"

export const getExpenses = async () => {
    try {
      const response = await api.get("v1/expenses")
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar Despesas:', error)
      throw error;
    }
  }
  
  export const getExpenseById = async (id) => {
    try {
      const response = await api.get(`${"v1/expenses"}/${id}`)
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar Despesa por Id: ${id}:`, error)
      throw error;
    }
  }
  
  export const addExpense = async (expense) => {
    try {
      const response = await api.post("v1/expenses", expense)
      return response.data;
    } catch (error) {
      console.error('Erro ao adicionar despesa:', error)
      throw error;
    }
  }
  
  export const editExpense = async (id, expense) => {
    try {
      const response = await api.put(`${"v1/expenses"}/${id}`, expense)
      return response.data;
    } catch (error) {
      console.error(`Erro ao editar despesa ${id}:`, error)
      throw error;
    }
  }
export const deleteExpense = async (id) => {
    try {
      const response = await api.delete(`${"v1/expenses"}/${id}`)
      return response.data; 
    } catch (error) {
      console.error(`Erro ao deletar despesa ${id}:`, error)
      throw error; 
    }
  }
  