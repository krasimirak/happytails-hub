import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { HiInformationCircle } from 'react-icons/hi';
import { Alert, Button } from 'flowbite-react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faSquareMinus } from '@fortawesome/free-regular-svg-icons'

import styles from './PetDetails.module.scss';

import { PATH } from "../../constants";

import { useAuth } from "../../context/authContext";

import * as petsApi from '../../api/petsApi';

export default function PetDetails({id}) {
    const [details, setDetails] = useState({});
    const [error, setError] = useState(false);
    const { isAdmin } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        petsApi.getOne(id)
        .then(setDetails)
        .catch(() => setError(true));
    }, [id]);

    const onDeleteButtonClick = () => {
        // TO DO:
        // 1. Confirmation modal
        // 2. Error message handle (from catch)
        petsApi.remove(id)
        .then(() => { navigate(PATH.List) })
        .catch(() => setError(true));
    }

    if (error) {
        return (
            <Alert color="failure" icon={HiInformationCircle}>
                <h1 className="font-medium">Something went wrong!</h1>
                <p>The resource you are looking for wasn&apos;t found</p>
                <Button as={Link} to={PATH.List}>Go back to pets list</Button>
            </Alert>
        )
    }

    return (
        <div className={styles['details']}>
            <picture className={styles['details__media']}>
                <img src={details.image} alt={details.name} />

                { isAdmin && (
                    <div className={styles['details__links']}>
                        <Button
                            as={Link}
                            to={PATH.Edit.replace(':id', id)}
                            className={styles['details__link']}
                            size="lg"
                            state={details}>
                            <FontAwesomeIcon icon={faPenToSquare} />
                            <span className="ml-3 text-lg">Edit</span>
                        </Button>
                        <Button
                            onClick={onDeleteButtonClick}
                            className={styles['details__link']}
                            size="lg">
                            <FontAwesomeIcon icon={faSquareMinus} />
                            <span className="ml-3 text-lg">Delete</span>
                        </Button>
                    </div>
                )}
            </picture>
            <div className={styles['details__content']}>
                <h1>
                    <span className='mr-2'>{details.name}</span>
                </h1>
                <p className="mb-6">{details.description}</p>

                <p>Size: {details.size}</p>
                <p>{details.age}</p>
                <p>{details.gender}</p>
                <p>Good with children: {details['good_with_children'] ? 'Yes' : 'No'}</p>
                <p>Good with cats: {details['good_with_cats'] ? 'Yes' : 'No'}</p>
                <p>Good with dogs: {details['good_with_dogs'] ? 'Yes' : 'No'}</p>
                <p>House trained: {details['good_with_dogs'] ? 'Yes' : 'No'}</p>
            </div>
        </div>
    )
}