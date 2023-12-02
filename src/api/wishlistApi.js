import { doc, addDoc, getDoc, getDocs, updateDoc, deleteDoc, Timestamp } from "firebase/firestore";

import { db } from './firebase';

/**
 *
 * @param {string} uid - user id
 * @returns {Array} array of pets added to wishlist
 */
export const getUserWishlist = async (uid) => {
    try {
        const docRef = doc(db, "wishlists", uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data().pets;
        } else {
            throw new Error(`There is no record of a wishlist for user with ID: ${uid}`);
        }
    }
    catch (error) {
        throw new Error(`An error occured while trying to fetch wishlist for user with ID ${uid}: ${error}`);
    }
}
