import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaw } from '@fortawesome/free-solid-svg-icons'

import styles from './Header.module.scss';
import { USER_ROLES } from '../../constants';

export default function Header({userRole}) {
    const navLinkClass = ({isActive}) => isActive ? styles['active'] : '';

    return (
        <header className={`container mx-auto py-6 mb-6 ${styles['header']}`}>
            <div>
                <NavLink to='/'>
                    <FontAwesomeIcon icon={faPaw} style={{color: '#3AA1A6'}} size="3x" />
                    <strong className={styles['header__title']}>HappyTails Hub</strong>
                </NavLink>
            </div>

            <nav className={styles['menu']}>
                <ul className={styles['menu__list']}>
                    <li className={styles['menu__item']}>
                        <NavLink to='/list' className={navLinkClass}>Open for adoption</NavLink>
                    </li>

                    {userRole === USER_ROLES.guest && (
                        <>
                            <li className={styles['menu__item']}>
                                <NavLink to='/login' className={navLinkClass}>Login</NavLink>
                            </li>
                            <li className={styles['menu__item']}>
                                <NavLink to='/register' className={navLinkClass}>Register</NavLink>
                            </li>
                        </>)}

                    {[USER_ROLES.user, USER_ROLES.admin].includes(userRole) && (
                        <>
                            <li className={styles['menu__item']}>
                                <NavLink to='/selections' className={navLinkClass}>My selections</NavLink>
                            </li>
                            <li className={styles['menu__item']}>
                                <NavLink to='/account' className={navLinkClass}>My account</NavLink>
                            </li>
                            <li className={styles['menu__item']}>
                                <NavLink to='/logout' className={navLinkClass}>Logout</NavLink>
                            </li>
                        </>)}
                </ul>
            </nav>
        </header>
    )
}