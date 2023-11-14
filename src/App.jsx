import { useState } from 'react'

import PetsList from './components/PetsList';

const USER_ROLES = {
  admin: 'admin',
  loggedIn: 'loggedIn',
  guest: 'guest'
};

function App() {
  // eslint-disable-next-line no-unused-vars
  const [userRole, setUserRole] = useState(USER_ROLES.guest);

  return (
    <>
      <PetsList />
    </>
  )
}

export default App
