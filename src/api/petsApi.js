import { collection, doc, addDoc, getDoc, getDocs, updateDoc, deleteDoc, Timestamp, query, where, documentId } from "firebase/firestore";

import { db } from './firebase';

import { filtersToFirestoreWhere } from "../utils/filters";

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
 * @param {Array} petsIdArray
 * @returns {Array} array with pets data
 */
export const getAllById = async (petsIdArray) => {
    const result = [];

    try {
        const q = query(PETS_COLLECTION, where(documentId(), 'in', petsIdArray));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(doc => {
            result.push({
                ...doc.data(),
                id: doc.id
            });
        });

        return result;
    }
    catch (error) {
        throw new Error(`An error occured while trying to fetch filtered pets data: ${error}`);
    }
}

/**
 *
 * @param {Array} filters
 * @returns {Array} array with pets data
 */
export const getAllFiltered = async (filters) => {
    const result = [];

    const filtersFirestore = filtersToFirestoreWhere(filters);
    console.log(filtersFirestore);

    try {
        const q = query(PETS_COLLECTION, ...filtersFirestore);
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(doc => {
            result.push({
                ...doc.data(),
                id: doc.id
            });
        });

        return result;
    }
    catch (error) {
        throw new Error(`An error occured while trying to fetch filtered pets data: ${error}`);
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

export const remove = async (id) => {
    try {
        const docRef = doc(db, "animals", id);
        await deleteDoc(docRef);
    }
    catch (error) {
        throw new Error(`An error occured while trying to delete pet ${id}: ${error}`);
    }
}