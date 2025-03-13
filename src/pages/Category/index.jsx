import React from "react"
import { useEffect, useState } from "react"
import api from "../../services/api"
import '../AppRoutes/style.css'
import { Link } from 'react-router-dom'


function Category()
{
    const[allCategory, setAllCategory] = useState([])
    async function GetCategory()
    {
        const categoriesFromApi = await api.get("v1/category")
        setAllCategory(categoriesFromApi.data)
    }
    useEffect(() => {
       GetCategory()
   
     },[]
   )
   
    return(
        <div >
            <h1>Categorias</h1>
            <Link to={'/'}className="button">login</Link>
            <Link to={'/usuario'}className="button">Usuarios</Link>
            <Link to={'/despesa'}className="button"> Despesas</Link>
            <div className="container">
                {allCategory.map((category) => (
                    <div key={category.id}>
                        <div className="card">
                            <p>Categoria: <span>{category.categoryName}</span></p>
                        </div>
                    </div>
                ))}  
                
            </div>
        </div>
    )
}
export default Category