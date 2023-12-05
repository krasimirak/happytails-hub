import { NavLink } from 'react-router-dom';

import { Navbar } from 'flowbite-react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaw } from '@fortawesome/free-solid-svg-icons'

import styles from './Header.module.scss';

import { PATH } from '../../constants';
import { useAuth } from '../../context/authContext';

export default function Header() {
    const { isAdmin, isLoggedIn } = useAuth();
    const navLinkClass = ({isActive}) => isActive ? styles['active'] : '';

    return (
        <Navbar fluid rounded>
            <Navbar.Brand as={NavLink} to={PATH.Home}>
                <FontAwesomeIcon icon={faPaw} style={{color: '#3AA1A6'}} size="3x" />
                <strong className={styles['header__title']}>HappyTails Hub</strong>
            </Navbar.Brand>


            <Navbar.Toggle />
            <Navbar.Collapse>
                <Navbar.Link as={NavLink} to={PATH.List} className={navLinkClass}>Open for adoption</Navbar.Link>

                { !isLoggedIn  && (<>
                    <Navbar.Link as={NavLink} to={PATH.Login} className={navLinkClass}>Login </Navbar.Link>
                    <Navbar.Link as={NavLink} to={PATH.Register} className={navLinkClass}>Register</Navbar.Link>
                </>)}

                { isLoggedIn && isAdmin && (
                    <Navbar.Link as={NavLink} to={PATH.Add} className={navLinkClass}>Add new pet</Navbar.Link>
                )}

                { isLoggedIn && (<>
                    <Navbar.Link as={NavLink} to={PATH.Selections} className={navLinkClass}>My selections</Navbar.Link>
                    <Navbar.Link as={NavLink} to={PATH.Account} className={navLinkClass}>My account</Navbar.Link>
                    <Navbar.Link as={NavLink} to={PATH.Logout} className={navLinkClass}>Logout</Navbar.Link>
                </>)}
            </Navbar.Collapse>
        </Navbar>
    );
}