import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

import { HiInformationCircle } from 'react-icons/hi';
import { Alert, Button } from 'flowbite-react';

import { PATH } from "../constants";

import * as petsApi from '../api/petsApi';

import PetForm from "../components/Forms/PetForm";


export default function PetEditPage() {
    const { id } = useParams();
    const { state: data } = useLocation();
    const [ petData, setPetData ] = useState({});
    const [ error, setError ] = useState(false);

    useEffect(() => {
        if (data) {
            setPetData(data);
        }
        else {
            petsApi.getOne(id)
            .then(setPetData)
            .catch(() => setError(true))
        }
    }, [data, id]);

    return (
        <main className="container px-4 mx-auto">
            { error &&
                <Alert color="failure" icon={HiInformationCircle}>
                    <h1>Something went wrong!</h1>
                    <p>The resource you are looking for wasn&apos;t found</p>
                    <Button as={Link} to={PATH.List}>Go back to pets list</Button>
                </Alert> }

            { !error && (
                <>
                    <h1>Edit listing</h1>
                    {Object.keys(petData).length && <PetForm pet={ {...petData, id} } />}
                </>
            )  }
        </main>
    )
}