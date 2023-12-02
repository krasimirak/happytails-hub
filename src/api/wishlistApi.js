import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

import { db } from './firebase';

/**
 *
 * @param {string} uid - user id
 * @returns {Array} array of pets added to wishlist
 */
export const getUserWishlist = async (uid) => {
    const userWishlistRef = doc(db, "wishlists", uid);

    try {
        const docSnap = await getDoc(userWishlistRef);

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

export const addToUserWishlist = async (uid, petId) => {
    const userWishlistRef = doc(db, "wishlists", uid);

    try {
        await updateDoc(userWishlistRef, {
            pets: arrayUnion(petId)
        });
    }
    catch (error) {
        throw new Error(`An error occured while trying to add pet (${petId}) to wishlist for user with ID ${uid}: ${error}`);
    }
}

export const removeFromUserWishlist = async (uid, petId) => {
    const userWishlistRef = doc(db, "wishlists", uid);

    try {
        await updateDoc(userWishlistRef, {
            pets: arrayRemove(petId)
        });
    }
    catch (error) {
        throw new Error(`An error occured while trying to add remove (${petId}) to wishlist for user with ID ${uid}: ${error}`);
    }
}