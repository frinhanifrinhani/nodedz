import api from '../../../utils/api'

import styles from './AddPet.module.css'

import { useState } from 'react'
import { Navigate } from 'react-router-dom'

import useFlashMessage from '../../../hooks/useFlashMessage'

import PetForm from '../../form/PetForm'

function AddPet() {
    return (
        <section className={styles.addpet_header}>
            <div >
                <h1>AddPet</h1>
                <p>Depois ele ficará disponível para adoção</p>
            </div>
            <PetForm btnText="Cadastrar Pet" />

        </section >
    )
}

export default AddPet