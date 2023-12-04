import { Routes, Route } from 'react-router-dom';

import { AuthProvider } from './context/authContext';

import { PATH } from './constants';

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
import Footer from './components/Footer/Footer';
import AuthGuard from './components/guards/AuthGuard';
import GuestGuard from './components/guards/GuestGuard';
import AdminGuard from './components/guards/AdminGuard';


function App() {

  return (
    <AuthProvider>
        <Header />
        <Routes>
          <Route path={PATH.Home} element={<Home />} />
          <Route path={PATH.List} element={<PetsListPage />} />
          <Route path={PATH.Details} element={<PetDetailsPage />} />
          <Route path={PATH.NotFound} element={<PageNotFound />} />

          <Route element={<GuestGuard />}>
            <Route path={PATH.Login} element={<Login />} />
            <Route path={PATH.Register} element={<Register />} />
          </Route>

          <Route element={<AuthGuard />}>
            <Route path={PATH.Selections} element={<Selections />} />
            <Route path={PATH.Account} element={<Account />} />
            <Route path={PATH.Logout} element={<Logout />} />
          </Route>

          <Route element={<AdminGuard />}>
            <Route path={PATH.Add} element={<AddNew />} />
            <Route path={PATH.Edit} element={<PetEditPage />} />
          </Route>

        </Routes>

        <Footer />
    </AuthProvider>
  )
}

export default App
