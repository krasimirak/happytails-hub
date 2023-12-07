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

import ConfirmationModal from "../modals/ConfirmationModal";

export default function PetDetails({id}) {
    const [details, setDetails] = useState({});
    const [error, setError] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const { isAdmin } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        petsApi.getOne(id)
        .then(setDetails)
        .catch(() => setError(true));
    }, [id]);

    const onConfirmDelete = () => {
        petsApi.remove(id)
            .then(() => {
                navigate(PATH.List);
            })
            .catch(() => setError(true));
    }

    const onCancelDelete = () => {
        setDeleteModalOpen(false);
    }

    const onDeleteButtonClick = () => {
        setDeleteModalOpen(true);
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

                <div className={styles['details__labels']}>
                    {details.gender && <span className={styles['details__label']}>{details.gender}</span>}
                    {details.age && <span className={styles['details__label']}>{details.age}</span>}
                    {details.size && <span className={styles['details__label']}>{details.size}</span>}
                </div>

                {/* <h2>About</h2> */}
                <h3 className={styles['details__title--small']}>House-trained</h3>
                <p>{details['house_trained'] ? 'Yes' : 'No'}</p>

                <h3 className={`${styles['details__title--small']} mt-10`}>More info</h3>
                <p className="mb-5">{details.description}</p>

                <p>Good with children: {details['good_with_children'] ? 'Yes' : 'No'}</p>
                <p>Good with cats: {details['good_with_cats'] ? 'Yes' : 'No'}</p>
                <p>Good with dogs: {details['good_with_dogs'] ? 'Yes' : 'No'}</p>
            </div>

            {deleteModalOpen && (
                    <ConfirmationModal
                        title="Are you sure you want to delete this listing?"
                        closeHandler={onCancelDelete}
                        confirmHandler={onConfirmDelete}>
                        <p>This action is irreversible! Please use carefully.</p>
                    </ConfirmationModal>
                )}
        </div>
    )
}