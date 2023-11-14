import { useEffect, useState } from "react";
import styles from './PetsList.module.scss';

import *  as petsApi from '../../api/petsApi';

import PetCard from "../PetCard/PetCard";

export default function PetsList({ userRole }) {
    const [pets, setPets] = useState([]);

    useEffect(() => {
        petsApi.getAll()
            .then(result => setPets(result));
    }, []);

    return (
        <ul className={styles['cards']}>
            {pets.map(pet => (
                <PetCard
                    key={pet.id}
                    pet={pet}
                    userRole={userRole} />
            ))}
        </ul>
    )
}