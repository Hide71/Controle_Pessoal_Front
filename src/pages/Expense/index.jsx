import api from "../../services/api"
import React from "react"
import {useEffect, useState } from "react"
import "../AppRoutes/style.css"
import { Link } from 'react-router-dom'

function Expense()
{
    const[expenses, setExpenses] = useState([])
    async function GetExpenses()
    {
        const expensesFromApi = await api.get("v1/expenses")
        setExpenses (expensesFromApi.data)

    }
    useEffect(() => {
           GetExpenses()
       
         },[]
       )
    return(
        <div>
            <h1>Despesas</h1>
            <Link to={'/'}className="button">login</Link>
            <Link to={'/usuario'}className="button">Usuarios</Link>
            <Link to={'/categoria'}className="button"> Categoria</Link>
            <div className="container">
                {expenses.map((expense) =>(
                    <div key={expense.id}>
                        <div className="card">
                        <p>Descrição: <span>{expense.description}</span></p>
                        <p>Valor: <span>{expense.amount}</span></p>
                        <p>Data: <span>{expense.date}</span></p>
                        <p>Usuário: <span>{expense.userId}</span></p>
                        <p>Categoria: <span>{expense.categoryId}</span></p>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
}
export default Expense