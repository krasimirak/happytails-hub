import styles from './PetCard.module.css';

export default function PetCard({pet}) {
    if (!pet) {
        return (<></>);
    }

    const { name, image, gender, type, photos } = pet;

    return (
        <li>
            <article className={`${styles['card']}`}>
                <picture>
                    <img className={styles['card__image']} alt={name} src={image} />
                </picture>
                <div className='p-5 text-left'>
                    <h2>{name}, {gender}</h2>
                    <span>{type}</span>
                    <button alt={`View more info about ${name}`}>View more</button>
                </div>
            </article>
        </li>
    )
}