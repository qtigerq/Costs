import { useEffect, useState } from 'react'

import Input from '../form/Input'
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton'

import styles from './ProjectForm.module.css'

const ProjectForm = ({ handleSubmit, buttonText, projectData }) => {      //handleSubmit vai dizer se é um novo projeto ou um ja existente. ProjectData vai trazer os dados do projeto, caso o formulario seja chamado na tela de edição (ja existente)

    const [categories, setCategories] = useState([]);                   //Inicia como arrays vazios, esperando a resposta da API
    const [project, setProject] = useState(projectData || {})           //Se o formulario for chamado da tela de edicao, ele vai vir com os dados de ProjectData, senao, vem vazio

    useEffect(() => {                                                   //Vai renderizar os dados apenas uma vez, quando for necessário (Sem isso, o React fica renderizando o tempo todo buscando alterações nos dados)
        fetch('http://localhost:5000/categories', {                     //Request para a pseudo-API na url /categorias
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',                         //Vai receber JSON
            },
        })
            .then((resp) => resp.json())                                    //Vai transformar a resposta em JSON
            .then((data) => {
                setCategories(data)                                         //SetCategorias recebe Data
            })
            .catch((err) => console.log(err))
    }, [])                                                              //Valor inicial de espera: options vazias

    const submit = (event) => {
        event.preventDefault()                                          //Nao deixa o formulario ser executado como Page Reload.
        handleSubmit(project)                                           //Executa o método que for passado pela PROP e passa o project que ta cadastrado no form como argumento
    }

    const handleChange = (event) => {                                           //Funciona com qualquer formulário que tenha um input digitável
        setProject({ ...project, [event.target.name]: event.target.value })      // ...project=Pegar todos os dados do project até então (state); event.target.name (o nome do INPUT, independente do INPUT preenchido) vai receber event.target.value.
        console.log(project)
    }

    const handleCategory = (event) => {                                 //Essa estrutura seria mais pra trabalhar com MongoDB, não com banco relacional (SQL)
        setProject({
            ...project, category: {
                id: event.target.value,
                name: event.target.options[event.target.selectedIndex].text,             //A partir de event.target.selectedIndex acessamos o item selecionado no evento select (pelo index)
            }
        })
    }

    return (
        <form onSubmit={submit} className={styles.form}>
            <Input
                type='text'
                text='Nome do Projeto'
                name='name'
                placeholder='Insira o nome do projeto'
                handleOnChange={handleChange} 
                value={project.name ? project.name : ''}
            />
            <Input
                type='number'
                text='Orçamento total'
                name='budget'
                placeholder='Insira o orçamento total'
                handleOnChange={handleChange}
                value={project.budget ? project.budget : ''}
            />
            <Select
                name='category_id'
                text='Selecione a categoria'
                options={categories}
                handleOnChange={handleCategory}
                value={project.category ? project.category.id : ''}                     //Se a categoria tiver preenchida, passa o ID dela, senão, passa vazio (para diferenciar edição ou criação)
            />
            <SubmitButton text={buttonText} />
        </form>
    )
}

export default ProjectForm