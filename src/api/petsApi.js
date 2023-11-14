import { collection, getDocs } from "firebase/firestore";

import { db } from './firebase';

export const getAll = async () => {
    const querySnapshot = await getDocs(collection(db, "animals"));
    const result = [];

    querySnapshot.forEach(doc => {
        result.push({
            ...doc.data(),
            id: doc.id
        });
    });

    return result;
}

