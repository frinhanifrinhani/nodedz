import { useState } from "react"
import formStyles from './Form.module.css'
import Input from "./Input"
import Select from "./Select"

function PetForm({ handleSubmit, petData, btnText }) {
    const [pet, setPet] = useState(petData || {})
    const [preview, setPreview] = useState([])
    const colors = ['Branco', 'Preto', 'Cinza', 'Caramelo', 'Mesclado']

    function onFileChange(e) { }
    function hanleChange(e) { }
    function handleColor(e) { }

    return (
        <form className={formStyles.form_container}>
            <Input
                text="Imagens"
                type="file"
                name="images"
                handleOnChange={onFileChange}
                multiple={true}
            />
            <Input
                text="Nome"
                type="texto"
                name="name"
                placeholder="Digite o nome do pet"
                handleOnChange={hanleChange}
                value={pet.name || ''}
            />
            <Input
                text="Idade"
                type="texto"
                name="age"
                placeholder="Digite a idade do pet"
                handleOnChange={hanleChange}
                value={pet.age || ''}
            />
            <Input
                text="Peso"
                type="number"
                name="weight"
                placeholder="Digite o peso do pet"
                handleOnChange={hanleChange}
                value={pet.weight || ''}
            />

            <Select
                text="Cor"
                name="color"
                options={colors}
                handleOnChange={handleColor}
                value={pet.color || ''}
            />

            <input type="submit" value={btnText} />
        </form>
    )
}

export default PetForm