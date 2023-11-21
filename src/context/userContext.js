import { createContext } from "react";

import { USER_ROLES } from '../constants';

export const UserContext = createContext(USER_ROLES.guest);
