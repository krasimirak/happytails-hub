import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaw } from '@fortawesome/free-solid-svg-icons'

import styles from './Header.module.scss';
import { USER_ROLES, PATH } from '../../constants';

export default function Header({userRole}) {
    const navLinkClass = ({isActive}) => isActive ? styles['active'] : '';

    return (
        <header className={`px-4 mx-auto py-6 bg-white ${styles['header']}`}>
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

                    {userRole === USER_ROLES.guest && (
                        <>
                            <li className={styles['menu__item']}>
                                <NavLink to={PATH.Login} className={navLinkClass}>Login</NavLink>
                            </li>
                            <li className={styles['menu__item']}>
                                <NavLink to={PATH.Register} className={navLinkClass}>Register</NavLink>
                            </li>
                        </>)}

                    { userRole === USER_ROLES.admin && (
                        <>
                            <li className={styles['menu__item']}>
                                <NavLink to={PATH.Add} className={navLinkClass}>Add new pet</NavLink>
                            </li>
                        </>)}

                    {[USER_ROLES.user, USER_ROLES.admin].includes(userRole) && (
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
        </header>
    )
}