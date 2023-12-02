import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { doc, updateDoc, getDoc, setDoc } from "firebase/firestore";

import app, { db } from './firebase';

export const auth = getAuth(app);

export const register = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        // Create an empty wishlist document
        const uid = userCredential.user.uid;
        const userWishlistRef = doc(db, "wishlists", uid);
        await setDoc(userWishlistRef, { pets: [] });
    }
    catch (error) {
        throw new Error(`An error occured while trying to create user: ${error}`);
    }
}

export const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
}

export const logout = () => {
    return signOut(auth);
}

export const getAdditionalCurrentUserData = async () => {
    const user = auth.currentUser;

    if (user !== null) {
      const docRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(docRef);

      if (userDoc.exists()) {
        return userDoc.data();
      }
    }

    return {};
}

const setAdmin = async (uid) => {
  const data = { role: 'admin' };

  try {
    const docRef = doc(db, "users", uid);
    const userDoc = await getDoc(docRef);

    if (userDoc.exists()) {
      await updateDoc(docRef, data)
    }
    else {
      await setDoc(docRef, data)
    }
  }
  catch (err) {
    console.log(err);
  }
}