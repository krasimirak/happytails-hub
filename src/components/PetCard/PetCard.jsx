import { useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './PetCard.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMars, faVenus, faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { Button } from 'flowbite-react';

import { USER_ROLES } from '../../constants';
import ErrorModal from '../ErrorModal';

export default function PetCard({pet, userRole}) {
    // TO DO: ADD check if user has already added this pet to selections
    const [isAdded, setIsAdded] = useState(false);
    const [error, setError] = useState({});

    if (!pet) {
        return (<></>);
    }

    const { id, name, image, gender, type } = pet;

    const onAddToSelectionsClick = () => {
        if (userRole === USER_ROLES.guest) {
            setError({
                title: 'Operation not allowed',
                message: 'Please login or register to use this functionality'
            });

            return;
        }

        setIsAdded(state => !state);

        // TO DO: ADD to user selections
    }

    const onErrorDismiss = () => {
        setError({});
    }

    return (
        <>
            <li>
                <article className={styles['card']}>
                    <picture className={styles['cards__picture']}>
                        <img
                            className={styles['card__image']}
                            alt={name}
                            src={image} />
                    </picture>
                    <button
                        className={`${styles['card__button--select']} p-3`}
                        alt={`Add ${name} to my selections`}
                        onClick={onAddToSelectionsClick}>
                            {isAdded ?
                                <FontAwesomeIcon icon={fasHeart} size="lg" className={styles['card__heart']} /> : <FontAwesomeIcon icon={faHeart}  size="lg"  className={styles['card__heart']} />}
                    </button>
                    <div className='p-5 text-left'>
                        <h3 className={styles['card__heading']}>
                            <span className='mr-2'>{name}</span>
                            {gender.toLowerCase() === 'male' && <FontAwesomeIcon icon={faMars} />}
                            {gender.toLowerCase() === 'female' && <FontAwesomeIcon icon={faVenus} />}
                        </h3>
                        <span className='block mb-6'>{type}</span>

                        <Link
                            to={`/pet/${id}`}
                            className={styles['card__button--details']}
                            alt={`View more info about ${name}`}>
                                View details
                        </Link>
                    </div>
                </article>
            </li>

            {error.title && (
                <ErrorModal closeHandler={onErrorDismiss} title={error.title}>
                    <p>{error.message}</p>
                </ErrorModal>)}
        </>
    )
}