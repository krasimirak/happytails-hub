import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';

import { USER_ROLES } from './constants';
import Header from './components/Header/Header';
import Home from './pages/Home';
import PetsListPage from './pages/PetsListPage';
import Selections from './pages/Selections';
import Account from './pages/Account';
import Login from './pages/Login';
import Register from './pages/Register';
import PetDetailsPage from './pages/PetDetailsPage';
import PageNotFound from './pages/PageNotFound';


function App() {
  // eslint-disable-next-line no-unused-vars
  const [userRole, setUserRole] = useState(USER_ROLES.guest);

  return (
    <>
      <Header userRole={userRole} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/list" element={<PetsListPage />} />
        <Route path="/pet/:id" element={<PetDetailsPage />} />
        <Route path="/selections" element={<Selections />} />
        <Route path="/account" element={<Account />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/*' element={<PageNotFound />} />
      </Routes>
    </>
  )
}

export default App
