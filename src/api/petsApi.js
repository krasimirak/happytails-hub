import { collection, doc, addDoc, getDoc, getDocs, updateDoc, Timestamp } from "firebase/firestore";

import { db } from './firebase';

const PETS_COLLECTION = collection(db, "animals");

/**
 *
 * @param {string} id - pet id
 * @returns {Array} array with pets data
 */
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
 * @param {string} id - pet id
 * @returns {Object} pet data object
 */
export const getOne = async (id) => {
    try {
        const docRef = doc(db, "animals", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            throw new Error(`There is no record of a pet with ID: ${id}`);
        }
    }
    catch (error) {
        throw new Error(`An error occured while trying to fetch pet data ${id}: ${error}`);
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

/**
 *
 * @param {string} id - id of pet record
 * @param {Object} data - pet data to be saved
 */

export const update = async (id, data) => {
    try {
        const docRef = doc(db, "animals", id);
        await updateDoc(docRef, data);
    }
    catch (error) {
        throw new Error(`An error occured while trying to update pet ${id}: ${error}`);
    }
}