import {useState} from 'react'

import Input from '../form/Input'
import SubmitButton from '../form/SubmitButton'

import styles from '../project/ProjectForm.module.css'

const ServiceForm = ({handleSubmit, buttonText, projectData}) => {
    
    const [service, setService] = useState({})          //Começa com um objeto vazio


    const submit = (event) => {
        event.preventDefault()
        projectData.services.push(service)                   //Adiciona o serviço nos serviços
        handleSubmit(projectData)
    }

    const handleChange = (event) => {
        setService({ ...service, [event.target.name]: event.target.value})           // (...service): pega o objeto atual o target.name vira o name preenchido no input, e o target.value vira o valor quando alteramos o handleOnChange
    }

    return (
        <form onSubmit={submit} className={styles.form}>
            <Input
                type='text'
                text='Nome do serviço'
                name='name'
                placeholder='Insira o nome do serviço'
                handleOnChange={handleChange}
            />
            <Input
                type='number'
                text='Custo do serviço'
                name='cost'
                placeholder='Insira o valor total do serviço'
                handleOnChange={handleChange}
            />
            <Input
                type='text'
                text='Descrição do serviço'
                name='description'
                placeholder='Descreva o serviço'
                handleOnChange={handleChange}
            />                        
            <SubmitButton text={buttonText}/>
        </form>
    )
}

export default ServiceForm