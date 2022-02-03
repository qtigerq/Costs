import styles from './Select.module.css'

const Select = ({text, name, options, handleOnGhange, value}) => {
    return (
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}:</label>
            <select name={name} id={name}>
                <option disabled selected>Selecione uma opção</option>
                {options.map((option) => (                                      //Imprimir as categorias do db.json dentro das options do Select
                    <option value={option.id} key={option.id}>
                        {option.nome}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default Select