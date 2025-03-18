import { getExpenses, getExpenseById, addExpense, editExpense,deleteExpense  } from "../../services/expenseController"
import { useEffect, useState,} from "react"
import { Link } from 'react-router-dom'

function Expense() {
    const [expenses, setExpenses] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [currentExpense, setCurrentExpense] = useState(null);
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [userId, setUserId] = useState(null);
    const [categoryId, setCategoryId] = useState(null);
    const [accountId, setAccountId] = useState(null)
  
    useEffect(() => {
      const fetchExpenses = async () => {
        try {
          const data = await getExpenses()
          setExpenses(data)
        } catch (error) {
          console.error('Erro ao  buscar despesas:', error)
        }
      }
  
      fetchExpenses()
    }, [])
  
    const handleOpenModal = (expense = null) => {
      if (expense) {
        setCurrentExpense(expense)
        setDescription(expense.description)
        setAmount(expense.amount)
        setDate(expense.date)
        setUserId(expense.userId)
        setCategoryId(expense.categoryId)
        setAccountId(expense.accountId)
      } else {
        setCurrentExpense(null)
        setDescription('')
        setAmount(null)
        setDate('')
        setUserId(null)
        setCategoryId(null)
        setAccountId(null)
      }
      setModalOpen(true)
    }
  
    const handleCloseModal = () => {
      setModalOpen(false)
    }
  
    const handleSave = async () => {
      const expense = { description: description, amount: amount, date: date, userId: userId, categoryId: categoryId}
      try {
        if (currentExpense) {
          await editExpense(currentExpense.id, expense)
        } else {
          await addExpense(expense)
        }
        const data = await getExpenses()
        setExpenses(data)
        handleCloseModal()
      } catch (error) {
        console.error('Erro ao salvar despesa:', error)
      }
    }
    const handleDelete = async (id) => {
        try {
          await deleteExpense(id)
          const data = await getExpenses()
          setExpenses(data)
        } catch (error) {
          console.error('Erro ao deletar despesa:', error)
        }
      }
  
    return(
        <div>
            <h1>Despesas</h1>
            <div className="center-div">
                <Link to={'/'} className="button">login</Link>
                <Link to={'/usuario'} className="button">Usuarios</Link>
                <Link to={'/categoria'} className="button"> Categoria</Link>
                <Link to={'/account'} className="button">Conta</Link>
                <button onClick={() => handleOpenModal()}>Adicionar Despesa</button>
            </div>
            <div className="container">
                {expenses.length > 0 ? (
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Descrição</th>
                                <th>Valor</th>
                                <th>Data</th>
                                <th>Usuário</th>
                                <th>Categoria</th>
                                <th>Conta</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {expenses.map((expense) => (
                                <tr key={expense.id}>
                                    <td>{expense.description}</td>
                                    <td>{expense.amount}</td>
                                    <td>{expense.date}</td>
                                    <td>{expense.userId}</td>
                                    <td>{expense.categoryId}</td>
                                    <td>{expense.accountId}</td>
                                    <td>
                                        <button onClick={() => handleOpenModal(expense)}>Editar</button>
                                        <button onClick={() => handleDelete(expense.id)}>Excluir</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>Nenhum despesa cadastrada.</p>
                )}
                {modalOpen && (
                    <div className="modal">
                        <h2>{currentExpense ? 'Editar Despesa' : 'Adicionar Despesa'}</h2>
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Descrição"
                        />
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="Valor"
                        />
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            placeholder="Data"
                        />
                         <input
                            type="number"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            placeholder="Usuário"
                        />
                        <input
                            type="number"
                            value={categoryId}
                            onChange={(e) => setCategoryId(e.target.value)}
                            placeholder="Categoria"
                        />
                        <input
                            type="number"
                            value={accountId}
                            onChange={(e) => setAccountId(e.target.value)}
                            placeholder="Conta"
                        />
                        <button onClick={handleSave}>Salvar</button>
                        <button onClick={handleCloseModal}>Fechar</button>
                    </div>
                )}
    
            </div>
        </div>
    )
}
export default Expense