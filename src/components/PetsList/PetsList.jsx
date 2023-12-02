import { useEffect, useState } from "react";
import styles from './PetsList.module.scss';

import *  as petsApi from '../../api/petsApi';

import PetCard from "../PetCard/PetCard";

export default function PetsList({ petIds }) {
    const [pets, setPets] = useState([]);

    useEffect(() => {
        if (petIds) {
            if (petIds.length) {
                petsApi.getAllById(petIds)
                    .then(data => setPets(data))
                    .catch(err => console.log(err));
            }
        }
        else {
            petsApi.getAll()
                .then(data => setPets(data))
                .catch(err => console.log(err));
        }
    }, [petIds]);

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