import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMars, faVenus, faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-regular-svg-icons'

import { USER_ROLES } from '../constants';

import styles from './PetCard.module.scss';

import ErrorModal from './ErrorModal';
import { useState } from 'react';

export default function PetCard({pet, userRole}) {
    // TO DO: ADD check if user has already added this pet to selections
    const [isAdded, setIsAdded] = useState(false);
    const [error, setError] = useState({});

    if (!pet) {
        return (<></>);
    }

    const { name, image, gender, type } = pet;

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
                    <picture>
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
                        <h2 className={styles['card__heading']}>
                            <span className='mr-2'>{name}</span>
                            {gender === 'male' && <FontAwesomeIcon icon={faMars} />}
                            {gender === 'female' && <FontAwesomeIcon icon={faVenus} />}
                        </h2>
                        <span>{type}</span>
                        <button alt={`View more info about ${name}`}>View more</button>
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