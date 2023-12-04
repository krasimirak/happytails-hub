import styles from './Footer.module.scss';

export default function Footer() {
    return (
        <footer className={styles['footer']} >
            <p className="container mx-auto px-4 py-12">HappyTails Hub &copy; {new Date().getFullYear()}</p>
        </footer>
    )
}