import styles from './PetCard.module.scss';

export default function PetCardSkeleton() {
    return (
        <li>
            <article className={`${styles['card']} ${styles['card--skeleton']}`}>
                <div className={styles['card__image']} />

                <div className={`p-5 pb-2 text-left ${styles['card__content']}`}>
                    <div className={styles['card__heading']} />
                    <span className={`block mb-6 ${styles['card__subheading']}`} />

                    <div className={styles['card__button--details']} />
                </div>
            </article>
        </li>
    )
}