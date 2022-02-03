import styles from './Select.module.css'

const Select = ({ text, name, options, handleOnChange, value }) => {
    return (
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}:</label>
            <select
                name={name}
                id={name}
                onChange={handleOnChange}
                value={value || ''}                                             //value no caso do Select for chamado pela tela de edição
            >                                            
                <option>Selecione uma opção</option>
                {options.map((option) => (                                      //Imprimir as categorias do db.json dentro das options do Select
                    <option value={option.id} key={option.id}>
                        {option.name}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default Select