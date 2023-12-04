import styles from './HeroBanner.module.scss';

export default function HeroBanner({ heading, subheading }) {
    return (
        <div>
            <div className={styles['hero']} >
                <div className='container mx-auto'>
                    <h1 className={styles['hero__heading']}>{heading}</h1>
                    {subheading &&
                        <h2 className={styles['hero__subheading']}>{subheading}</h2>}
                </div>
            </div>
        </div>
    )
}
