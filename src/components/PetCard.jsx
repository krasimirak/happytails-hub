import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMars, faVenus } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-regular-svg-icons'


import styles from './PetCard.module.scss';

export default function PetCard({pet, userRole}) {
    if (!pet) {
        return (<></>);
    }

    const { name, image, gender, type, photos } = pet;

    const onAddToSelectionsClick = () => {
        if (userRole === 'guest') {
            alert('Please sign up to use this functionality');
        }
    }

    return (
        <li>
            <article className={styles['card']}>
                <picture>
                    <img className={styles['card__image']} alt={name} src={image} />
                </picture>
                <button className={styles['card__button']} alt={`Add ${name} to my selections`} onClick={onAddToSelectionsClick}>
                    <FontAwesomeIcon icon={faHeart} />
                </button>
                <div className='p-5 text-left'>
                    <h2> <span className='mr-2'>{name}</span>
                        {gender === 'male' && <FontAwesomeIcon icon={faMars} />}
                        {gender === 'female' && <FontAwesomeIcon icon={faVenus} />}
                    </h2>
                    <span>{type}</span>
                    <button alt={`View more info about ${name}`}>View more</button>
                </div>
            </article>
        </li>
    )
}