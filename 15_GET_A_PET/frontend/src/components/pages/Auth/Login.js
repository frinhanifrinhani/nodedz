import { useState, useContext } from "react"

import Input from '../../form/Input'

import styles from '../../form/Form.module.css'

import { Context } from "../../../context/UserContext"

function Login() {

    function handleChange(e) {

    }

    return (
        <section className={styles.form_container}>
            <h1>Login</h1>
            <form>
                <Input
                    text="E-mail"
                    type="email"
                    name="email"
                    placeholder="Digite o seu email"
                    handleOnChange={handleChange}
                />
                <Input
                    text="Senha"
                    type="password"
                    name="password"
                    placeholder="Digite a sua senha"
                    handleOnChange={handleChange}
                />

                <input type="submit" value="Entrar" />
            </form>
        </section>
    )
}

export default Login