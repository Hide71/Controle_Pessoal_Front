
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from "../Login"
import User from '../User'
import Category from "../Category"
import Expense from '../Expense'
import Account from '../Account'

function AppRoutes()
{
    return(
        <BrowserRouter>
        <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/usuario' element={<User />}/>
            <Route path='/categoria' element={<Category />}/>
            <Route path='/account' element={<Account />}/>
            <Route path='/despesa' element={<Expense />}/>
            <Route path='*' element={<h1>Not Found</h1>}/>

        </Routes>
        </BrowserRouter>
    )

}
export default AppRoutes