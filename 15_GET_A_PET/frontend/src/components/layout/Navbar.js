import { NavLink } from "react-router-dom"

import styles from './Navbar.module.css'

import Logo from '../../assets/img/logo.png'

function Navbar() {
    return (
        <nav className={styles.navbar}>
            <div className={styles.navbar_logo}>
                <img src={Logo} alt="Get A Pet" />
                <h2>Get A Pet</h2>
            </div>
            <ul>
                <li>
                    <NavLink to="/">Adotar</NavLink>
                </li>
                <li>
                    <NavLink to="/login">Entrar</NavLink>
                </li>
                <li>
                    <NavLink to="/register">Cadastrar</NavLink>
                </li>
            </ul>
        </nav>
    )


}

export default Navbar