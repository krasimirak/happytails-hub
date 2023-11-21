import { collection, getDocs, addDoc, Timestamp } from "firebase/firestore";

import { db } from './firebase';

const PETS_COLLECTION = collection(db, "animals");

export const getAll = async () => {
    const result = [];

    try {
        const querySnapshot = await getDocs(PETS_COLLECTION);
        querySnapshot.forEach(doc => {
            result.push({
                ...doc.data(),
                id: doc.id
            });
        });

        return result;
    }
    catch (error) {
        throw new Error(`An error occured while trying to fetch all pets data: ${error}`);
    }
}

/**
 *
 * @param {Object} data - pet data to be saved
 * @returns {string} id of pet record
 */

export const create = async (data) => {
    try {
        const docRef = await addDoc(PETS_COLLECTION, { ...data,  dateCreated: Timestamp.now() });
        return docRef.id;
    }
    catch (error) {
        throw new Error(`An error occured while trying to create pet: ${error}`);
    }
}