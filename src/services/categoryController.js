import api from "./api"

export const getCategories = async() =>
    {
        try 
        { const response = await api.get("v1/category")
            return response.data
            
        } catch (error) 
        {
            console.error("Erro ao Buscar Categorias:", error)
            throw error
        }
    }
export const getCategoryById = async (id) => {
    try {
        const response = await api.get(`${"v1/category"}/${id}`)
        return response.data;
    } catch (error) {
        console.error(`Erro ao buscar categoria por Id: ${id}:`, error)
        throw error;
    }
}

export const addCategory = async (category) => {
    try {
      const response = await api.post("v1/category", category)
      return response.data;
    } catch (error) {
      console.error('Erro ao adicionar categoria:', error)
      throw error;
    }
  }

  export const editCategory = async (id, category) => {
    try {
      const response = await api.put(`${"v1/category"}/${id}`, category)
      return response.data;
    } catch (error) {
      console.error(`Erro ao editar categoria ${id}:`, error)
      throw error;
    }
  }

  export const deleteCategory = async (id) => {
    try {
      const response = await api.delete(`${"v1/category"}/${id}`)
      return response.data; 
    } catch (error) {
      console.error(`Erro ao deletar categoria ${id}:`, error)
      throw error; 
    }
  } 

    