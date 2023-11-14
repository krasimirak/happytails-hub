import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaw } from '@fortawesome/free-solid-svg-icons'

import styles from './Header.module.scss';

export default function Header() {
    return (
        <header className={`py-6 mb-6 ${styles['header']}`}>
            <div>
                <FontAwesomeIcon icon={faPaw} style={{color: '#3AA1A6'}} size="3x" />
                <strong className={styles['header__title']}>HappyTails Hub</strong>
            </div>

            <nav className={styles['menu']}>
                <ul className={styles['menu__list']}>
                    <li className={styles['menu__item']}>Open for adoption</li>
                    <li className={styles['menu__item']}>Login</li>
                    <li className={styles['menu__item']}>Register</li>
                </ul>
            </nav>
        </header>
    )
}