import { GoogleOAuthProvider } from '@react-oauth/google'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from "../Login"
import User from '../User'
import Category from "../Category"
import Expense from '../Expense'
import Account from '../Account'

function AppRoutes()
{
    return (
        <GoogleOAuthProvider clientId="313667901167-d9cq0716r9ioll9uqdmf2qfa8nop0juv.apps.googleusercontent.com">
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Login />} />
                    <Route path='/usuario' element={<User />} />
                    <Route path='/categoria' element={<Category />} />
                    <Route path='/conta' element={<Account />} />
                    <Route path='/despesa' element={<Expense />} />
                    <Route path='*' element={<h1>Not Found</h1>} />
                </Routes>
            </BrowserRouter>
        </GoogleOAuthProvider>
    )

}
export default AppRoutes