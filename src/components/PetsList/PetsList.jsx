import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "flowbite-react";

import styles from './PetsList.module.scss';

import { useAuth } from "../../context/authContext";
import *  as wishlistApi from '../../api/wishlistApi';
import *  as petsApi from '../../api/petsApi';
import { PATH } from "../../constants";

import PetCard from "../PetCard/PetCard";
import PetCardSkeleton from "../PetCard/PetCardSkeleton";

export default function PetsList({ isSelections }) {
    const [selections, setSelections] = useState([]);
    const [pets, setPets] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useAuth();

    useEffect(() => {
        if (user.id) {
            wishlistApi.getUserWishlist(user.id)
                .then(selections => setSelections(selections))
                .catch(err => console.log(err));
        }
    }, [user.id]);

    useEffect(() => {
        setIsLoading(true);

        if (isSelections) {
            if (selections.length) {
                petsApi.getAllById(selections)
                    .then(data => setPets(data))
                    .catch(err => console.log(err))
                    .finally(() => setIsLoading(false));
            }
            else {
                // TO DO: No selections view
            }
        }
        else {
            petsApi.getAll()
                .then(data => setPets(data))
                .catch(err => console.log(err))
                .finally(() => setIsLoading(false));
        }
    }, [isSelections, selections]);

    if (isLoading) {
        return (
            <ul className={`mx-auto ${styles['cards']} ${isSelections ? styles['cards--four-columns'] : ''}`}>
                <PetCardSkeleton />
                <PetCardSkeleton />
                <PetCardSkeleton />
                {isSelections && <PetCardSkeleton />}
            </ul>
        )
    }

    if (pets.length) {
        return (
            <ul className={`mx-auto ${styles['cards']} ${isSelections ? styles['cards--four-columns'] : ''}`}>
                {pets.map(pet => (
                    <PetCard
                        key={pet.id}
                        pet={pet}
                        isSelected={selections.includes(pet.id)} />
                ))}
            </ul>
        )
    }
    else if (isSelections) {
        return (
            <>
                <h2>No selections found.</h2>
                <Button as={Link} to={PATH.PetsList}>Go back to see all pets</Button>
            </>
        )
    }
    else {
        return (
            <>
                <h2>No listings available at the moment.</h2>
            </>
        )
    }
}