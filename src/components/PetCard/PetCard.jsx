import { useState } from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMars, faVenus, faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { Button } from 'flowbite-react';

import { useAuth } from '../../context/authContext';
import { PATH } from '../../constants';
import ErrorModal from '../ErrorModal';
import styles from './PetCard.module.scss';


export default function PetCard({ pet }) {
    // TO DO: ADD check if user has already added this pet to selections
    const [isAdded, setIsAdded] = useState(false);
    const [error, setError] = useState({});
    const { user } = useAuth();

    if (!pet) {
        return (<></>);
    }

    const { id, name, image, gender, type } = pet;

    const onAddToSelectionsClick = () => {
        if (!user) {
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
                    <div className={styles['card__image']} style={ { backgroundImage: `url(${image})` } }>

                    </div>
                    {/* <picture className={styles['card__picture']}>
                        <img
                            className={styles['card__image']}
                            alt={name}
                            src={image} />
                    </picture> */}
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
                        <span className='block mb-6'>{type}</span>

                        {/* OPTTO DO: ADD state for pet details  */}
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