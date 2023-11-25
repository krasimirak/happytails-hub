import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { HiInformationCircle } from 'react-icons/hi';
import { Alert, Button } from 'flowbite-react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faSquareMinus } from '@fortawesome/free-regular-svg-icons'

// import { authContext } from "../../context/authContext";

import * as petsApi from '../../api/petsApi';
import { USER_ROLES, PATH } from "../../constants";

import styles from './PetDetails.module.scss';

export default function PetDetails({id}) {
    const [details, setDetails] = useState({});
    const [error, setError] = useState(false);
    // const userRole = useContext(authContext);
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
            </picture>
            <div className={styles['details__content']}>
                {/* TO DO: useAuth()  */}
                { true && (
                    <div className={styles['details__links']}>
                        {/* TO DO: Link with state={{ petDetails }}> */}
                        <Button
                            as={Link}
                            to={PATH.Edit.replace(':id', id)}
                            className={styles['details__link']}
                            size="lg">
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

                <h1>
                    <span className='mr-2'>{details.name}</span>
                </h1>
                <p>{details.description}</p>

                <p>Size: {details.size}</p>
                <p>Good with children: {details['good_with_children'] ? 'Yes' : 'No'}</p>
                <p>Good with cats: {details['good_with_cats'] ? 'Yes' : 'No'}</p>
                <p>Good with dogs: {details['good_with_dogs'] ? 'Yes' : 'No'}</p>
            </div>
        </div>
    )
}