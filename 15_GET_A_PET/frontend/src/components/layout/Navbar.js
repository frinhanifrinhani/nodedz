import { NavLink } from "react-router-dom"

import Logo from '../../assets/img/logo.png'

function Navbar() {
    return (
        <nav>
            <div>
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