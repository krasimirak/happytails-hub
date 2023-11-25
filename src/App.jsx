import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';

import { AuthProvider } from './context/authContext';
import { USER_ROLES, PATH } from './constants';
import Header from './components/Header/Header';
import Home from './pages/Home';
import PetsListPage from './pages/PetsListPage';
import Selections from './pages/Selections';
import Account from './pages/Account';
import Login from './pages/Login';
import Register from './pages/Register';
import PetDetailsPage from './pages/PetDetailsPage';
import PetEditPage from './pages/PetEditPage';
import AddNew from './pages/AddNew';
import PageNotFound from './pages/PageNotFound';
import Logout from './pages/Logout';


function App() {
  // eslint-disable-next-line no-unused-vars
  const [userRole, setUserRole] = useState(USER_ROLES.guest);


  return (
    <AuthProvider>
        <Header userRole={userRole} />
        <Routes>
          <Route path={PATH.Home} element={<Home />} />
          <Route path={PATH.List} element={<PetsListPage />} />
          <Route path={PATH.Details} element={<PetDetailsPage />} />
          <Route path={PATH.Edit} element={<PetEditPage />} />
          <Route path={PATH.Selections} element={<Selections />} />
          <Route path={PATH.Account} element={<Account />} />
          <Route path={PATH.Login} element={<Login />} />
          <Route path={PATH.Register} element={<Register />} />
          <Route path={PATH.Logout} element={<Logout />} />
          <Route path={PATH.Add} element={<AddNew />} />
          <Route path={PATH.NotFound} element={<PageNotFound />} />
        </Routes>
    </AuthProvider>
  )
}

export default App
