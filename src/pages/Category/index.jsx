import { getCategories, getCategoryById, addCategory, editCategory, deleteCategory} from "../../services/categoryController" 
import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import UserProfile from "../Login/userProfile"


function Category()
{
    const[categories, setCategories] = useState([])
    const[modalOpen, setModalOpen] = useState(false)
    const[currentCategory, setCurrentCategory] = useState(null)
    const[categoryName, setCategoryName] = useState(" ")
    const[userId, setUserId] = useState(null)

    useEffect(() => {
       const fetchCategories = async()=>{
        try {
            const data = await getCategories()
            setCategories(data)
        } catch (error) {
            console.error("Erro ao buscar categorias:", error)
            
        }
       }
       fetchCategories()
   
     },[]
   )
    const handleOpenModal = (category = null) => {
        if (category) {
            setCurrentCategory(category)
            setCategoryName(category.categoryName)
            setUserId(category.userId)
        } else {
            setCurrentCategory(null)
            setCategoryName('')
            setUserId(null)
        }
        setModalOpen(true)
    }
    const handleCloseModal = () => {
        setModalOpen(false)
    }

    const handleSave = async () => {
        const category = { categoryName: categoryName, userId: userId }
        try {
            if (currentCategory) {
                await editCategory(currentCategory.id, category)
            } else {
                await addCategory(category)
            }
            const data = await getCategories()
            setCategories(data)
            handleCloseModal()
        } catch (error) {
            console.error('Erro ao salvar categoria:', error)
        }
    }
    const handleDelete = async (id) => {
        try {
            await deleteCategory(id)
            const data = await getCategories()
            setCategories(data)
        } catch (error) {
            console.error('Erro ao deletar categoria:', error)
        }
    }
     
   
    return(
        <div className="center-div">
            <h1>Categorias</h1>
            <UserProfile/>
            <Link to={'/conta'} className="button">Conta</Link>
            <Link to={'/despesa'} className="button"> Despesas</Link>
            <button onClick={() => handleOpenModal()}>Adicionar Categoria</button>
            <div className="container">
                {categories.length > 0 ? (
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Categoria</th>
                                <th>Usuário</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((category) => (
                                <tr key={category.id}>
                                    <td>
                                        <p><span>{category.CategoryName}</span></p>
                                    </td>
                                    <td>
                                        <p><span>{category.userId}</span></p>
                                    </td>
                                    <td>
                                        <button onClick={() => handleOpenModal(category)}>Editar</button>
                                        <button onClick={() => handleDelete(category.id)}>Excluir</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ): (
                    <p>nenhuma categoria encontrada</p>
                )}

                {modalOpen && (
                    <div className="modal">
                        <h2>{currentCategory ? 'Editar Categoria' : 'Adicionar Categoria'}</h2>
                        <input
                            type="text"
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                            placeholder="Categoria"
                        />
                        <input
                            type="number"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            placeholder="Usuario"
                        />
                        <button onClick={handleSave}>Salvar</button>
                        <button onClick={handleCloseModal}>Fechar</button>
                    </div>
                )}

            </div>
        </div>
    )
}
export default Category