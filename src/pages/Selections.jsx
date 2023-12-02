import { useEffect, useState } from "react";

import { useAuth } from "../context/authContext";
import * as wishlistApi from '../api/wishlistApi';
import * as petsApi from '../api/petsApi';

import PetsList from "../components/PetsList/PetsList";

export default function Selections() {
    const [selections, setSelections] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        if (user.id) {
            wishlistApi.getUserWishlist(user.id)
                .then(selections => setSelections(selections))
                .catch(err => console.log(err));
        }
    }, [user.id]);

    return (
        <main className="container px-4 mx-auto">
            <h1 className="text-4xl font-extrabold my-8">My Selections</h1>

            <PetsList petIds={selections} />
        </main>
    )
}