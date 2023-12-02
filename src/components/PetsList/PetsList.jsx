import { useEffect, useState } from "react";
import styles from './PetsList.module.scss';

import *  as petsApi from '../../api/petsApi';

import PetCard from "../PetCard/PetCard";

export default function PetsList() {
    const [pets, setPets] = useState([]);

    useEffect(() => {
        petsApi.getAll()
            .then(result => setPets(result));
    }, []);

    return (
        <ul className={`mx-auto ${styles['cards']}`}>
            {pets.map(pet => (
                <PetCard
                    key={pet.id}
                    pet={pet} />
            ))}
        </ul>
    )
}