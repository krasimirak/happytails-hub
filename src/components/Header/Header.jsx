import { NavLink } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaw } from '@fortawesome/free-solid-svg-icons'

import styles from './Header.module.scss';

import { PATH } from '../../constants';
import { useAuth } from '../../context/authContext';

export default function Header() {
    const { isAdmin, isLoggedIn } = useAuth();
    const navLinkClass = ({isActive}) => isActive ? styles['active'] : '';

    return (
        <header className={styles['header']}>
            <div className={`container px-4 mx-auto py-6 bg-white ${styles['header__container']}`}>
                <div>
                    <NavLink to={PATH.Home}>
                        <FontAwesomeIcon icon={faPaw} style={{color: '#3AA1A6'}} size="3x" />
                        <strong className={styles['header__title']}>HappyTails Hub</strong>
                    </NavLink>
                </div>

                <nav className={styles['menu']}>
                    <ul className={styles['menu__list']}>
                        <li className={styles['menu__item']}>
                            <NavLink to={PATH.List} className={navLinkClass}>Open for adoption</NavLink>
                        </li>

                        { !isLoggedIn  && (
                            <>
                                <li className={styles['menu__item']}>
                                    <NavLink to={PATH.Login} className={navLinkClass}>Login</NavLink>
                                </li>
                                <li className={styles['menu__item']}>
                                    <NavLink to={PATH.Register} className={navLinkClass}>Register</NavLink>
                                </li>
                            </>)}

                        { isLoggedIn && isAdmin && (
                        <>
                            <li className={styles['menu__item']}>
                                <NavLink to={PATH.Add} className={navLinkClass}>Add new pet</NavLink>
                            </li>
                        </>) }

                        { isLoggedIn && (
                            <>
                                <li className={styles['menu__item']}>
                                    <NavLink to={PATH.Selections} className={navLinkClass}>My selections</NavLink>
                                </li>
                                <li className={styles['menu__item']}>
                                    <NavLink to={PATH.Account} className={navLinkClass}>My account</NavLink>
                                </li>
                                <li className={styles['menu__item']}>
                                    <NavLink to={PATH.Logout} className={navLinkClass}>Logout</NavLink>
                                </li>
                            </>)}
                    </ul>
                </nav>
            </div>
        </header>
    )
}