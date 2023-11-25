import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import { HiInformationCircle } from 'react-icons/hi';
import { Alert, Button } from 'flowbite-react';

import * as petsApi from '../api/petsApi';
import PetForm from "../components/Forms/PetForm";

export default function PetDetailsPage() {
    const { id } = useParams();
    const [ petData, setPetData ] = useState({});
    const [ error, setError ] = useState(false);

    useEffect(() => {
        petsApi.getOne(id)
        .then(setPetData)
        .catch(() => setError(true))
    }, [id]);


    return (
        <main className="container px-4 mx-auto">
            { error &&
                <Alert color="failure" icon={HiInformationCircle}>
                    <h1 className="font-medium">Something went wrong!</h1>
                    <p>The resource you are looking for wasn&apos;t found</p>
                    <Button as={Link} to="/pets">Go back to pets list</Button>
                </Alert> }

            { !error && <PetForm pet={ {...petData, id} } /> }
        </main>
    )
}