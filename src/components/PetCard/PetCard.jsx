import { useState } from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMars, faVenus, faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { Button } from 'flowbite-react';

import styles from './PetCard.module.scss';

import { useAuth } from '../../context/authContext';
import { PATH } from '../../constants';

import * as wishlistApi from '../../api/wishlistApi';

import ErrorModal from '../modals/ErrorModal';

export default function PetCard({ pet, isSelected }) {
    const [isAdded, setIsAdded] = useState(isSelected);
    const [error, setError] = useState({});
    const { isLoggedIn, user } = useAuth();

    if (!pet) {
        return (<></>);
    }

    const { id, name, image, gender, type } = pet;

    const onAddToSelectionsClick = () => {
        if (!isLoggedIn) {
            setError({
                title: 'Operation not allowed',
                message: 'Please login or register to use this functionality'
            });

            return;
        }

        if (isAdded) {
            wishlistApi.removeFromUserWishlist(user.id, pet.id)
                .then(() => setIsAdded(false))
                .catch((err) => console.log(err))
        }
        else {
            wishlistApi.addToUserWishlist(user.id, pet.id)
                .then(() => setIsAdded(true))
                .catch((err) => console.log(err))
        }
    }

    const onErrorDismiss = () => {
        setError({});
    }

    return (
        <>
            <li>
                <article className={styles['card']}>
                    <div className={styles['card__image']} style={ { backgroundImage: `url(${image})` } }>

                    </div>

                    <button
                        className={`${styles['card__button--select']} p-3`}
                        alt={`Add ${name} to my selections`}
                        onClick={onAddToSelectionsClick}>
                            {isAdded ?
                                <FontAwesomeIcon icon={fasHeart} size="lg" className={styles['card__heart']} /> : <FontAwesomeIcon icon={faHeart}  size="lg"  className={styles['card__heart']} />}
                    </button>
                    <div className={`p-5 pb-2 text-left ${styles['card__content']}`}>
                        <h3 className={styles['card__heading']}>
                            <span className='mr-2'>{name}</span>
                            {gender.toLowerCase() === 'male' && <FontAwesomeIcon icon={faMars} />}
                            {gender.toLowerCase() === 'female' && <FontAwesomeIcon icon={faVenus} />}
                        </h3>

                        <Link
                            to={PATH.Details.replace(':id', id)}
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

                    <div className="flex flex-wrap gap-2">
                        <Button as={Link} to={PATH.Login} size="lg">Login</Button>
                        <Button as={Link} to={PATH.Register} size="lg">Register</Button>
                    </div>
                </ErrorModal>)}
        </>
    )
}