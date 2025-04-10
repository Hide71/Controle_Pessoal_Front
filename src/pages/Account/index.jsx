import { getAccounts, getAccountById, addAccount, editAccount,deleteAccount  } from "../../services/accountContoller"
import { useEffect, useState,} from "react"
import { Link } from 'react-router-dom'
import UserProfile from "../Login/userProfile";

function Account(){
    const [accounts, setAccounts] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [currentAccount, setCurrentAccount] = useState(null);
    const [description, setDescription] = useState('');
    const [balance, setBalance] = useState(null);
    const [typeAccount, setTypeAccount] = useState(null);

    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const data = await getAccounts()
                setAccounts(data)
            } catch (error) {
                console.error('Erro ao  buscar contas:', error)
            }
        }

        fetchAccounts()
    }, [])

    const handleOpenModal = (account = null) => {
        if (account) {
            setCurrentAccount(account)
            setDescription(account.description)
            setBalance(account.balance)
            setTypeAccount(account.typeAccount)
        } else {
            setCurrentAccount(null)
            setDescription('')
            setBalance(null)
            setTypeAccount(null)
        }
        setModalOpen(true)
    }

    const handleCloseModal = () => {
        setDescription('');
        setBalance(null);
        setTypeAccount(null);
        setCurrentAccount(null);
        setModalOpen(false)
    }

    const handleSave = async () => {
        const account = { description: description, balance: balance, typeAccount: Number(typeAccount)}
        try {
            if (currentAccount) {
                console.log(account)
                await editAccount(currentAccount.id, account)
            } else {
                await addAccount(account)
            }
            const data = await getAccounts()
            setAccounts(data)
            handleCloseModal()
        } catch (error) {
            console.error('Erro ao salvar conta:', error)
        }
    }
    const handleDelete = async (id) => {
        try {
            await deleteAccount(id)
            const data = await getAccounts()
            setAccounts(data)
        } catch (error) {
            console.error('Erro ao deletar conta:', error)
        }
    }
    return (
        <div>
            <h1> Conta </h1>
            <UserProfile/>
            <div className='center-div'>
                <Link to={'/categoria'} className='button'>Categorias</Link>
                <Link to={'/despesa'} className='button'>Despesas</Link>
                <button onClick={() => handleOpenModal()}>Adicionar Conta</button>
            </div>
            <div className="container">
            {accounts.length > 0 ? (
            <table className="table">
              <thead>
                <tr>
                  <th>Descrição</th>
                  <th>Balanço</th>
                  <th>Tipo de Conta</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {accounts.map((account) => (
                  <tr key={account.id}>
                    <td>{account.description}</td>
                    <td>{account.balance}</td>
                    <td>{account.typeAccount}</td>
                    <td>
                      <button onClick={() => handleOpenModal(account)}>Editar</button>
                      <button onClick={() => handleDelete(account.id)}>Excluir</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Nenhuma conta cadastrada.</p>
          )}
          {modalOpen && (
            <div className="modal">
              <h2>{currentAccount ? 'Editar Conta' : 'Adicionar Conta'}</h2>
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Descrição"
                        />
                        <input
                            type="number"
                            value={balance}
                            onChange={(e) => setBalance(Number(e.target.value))}
                            placeholder="Balanço"
                        />
                        <select value={typeAccount}
                            onChange={(e) => setTypeAccount(e.target.value)} 
                            placeholder="Tipo de conta">
                            <option value="1">Corrente</option>
                            <option value="2">Poupança</option>
                            <option value="3">Carteira</option>
                        </select>
              <button onClick={handleSave}>Salvar</button>
              <button onClick={handleCloseModal}>Fechar</button>
            </div>
          )}
            </div>
        </div>
    )
}
export default Account
