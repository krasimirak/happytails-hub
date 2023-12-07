import { where } from "firebase/firestore";

export const filtersToFirestoreWhere = (filters) => {
    // TO DO: Multiple values for a single field

    const whereClauses = [];
    for (const [name, value] of Object.entries(filters)) {
        if (value) {
            whereClauses.push(where(name, '==', value));
        }
    }

    return whereClauses;
};