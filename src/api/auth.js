import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"
import app from './firebase';

export const auth = getAuth(app);

export const register = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
}

export const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
}

export const logout = () => {
    return signOut(auth);
}

export const getCurrentUser = () => {
    const user = auth.currentUser;
    if (user !== null) {
      const displayName = user.displayName;
      const email = user.email;
      const emailVerified = user.emailVerified;

      return {
        displayName,
        email,
        emailVerified
      }
    }

    return null;
}