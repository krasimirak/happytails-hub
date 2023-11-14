import { useState } from 'react'

import { USER_ROLES } from './constants';
import PetsList from './components/PetsList/PetsList';
import Header from './components/Header/Header';


function App() {
  // eslint-disable-next-line no-unused-vars
  const [userRole, setUserRole] = useState(USER_ROLES.guest);

  return (
    <>
      <Header userRole={userRole} />
      <PetsList userRole={userRole} />
    </>
  )
}

export default App
