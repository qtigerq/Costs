import { useEffect, useState } from 'react'

import Input from '../form/Input'
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton'

import styles from './ProjetoForm.module.css'

const ProjetoForm = ({buttonText}) => {

    const [categorias, setCategorias] = useState([]);                   //Inicia como arrays vazios, esperando a resposta da API

    useEffect(() => {                                                   //Vai renderizar os dados apenas uma vez, quando for necessário (Sem isso, o React fica renderizando o tempo todo buscando alterações nos dados)
        fetch('http://localhost:5000/categorias', {                     //Request para a pseudo-API na url /categorias
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',                         //Vai receber JSON
        },
    })
        .then((resp) => resp.json())                                    //Vai transformar a resposta em JSON
        .then((data) => {
            setCategorias(data)                                         //SetCategorias recebe Data
        })
        .catch((err) => console.log(err))
    }, [])                                                              //Valor inicial de espera: options vazias

    return (
        <form className={styles.form}>
            <Input type='text' text='Nome do Projeto' name='nome' placeholder='Insira o nome do projeto'/>
            <Input type='number' text='Orçamento total' name='orcamento_total' placeholder='Insira o orçamento total'/>
            <Select name='categoria_id' text='Selecione a categoria' options={categorias}/>
            <SubmitButton text={buttonText}/>
        </form>
    )
}

export default ProjetoForm