import {v4 as uuidv4} from 'uuid'                        //Gerador de ID's

import styles from './Project.module.css'

import { useParams } from 'react-router-dom'                    //Hook para pegar variáveis que vem pela URL
import { useState, useEffect } from 'react'

import Loading from '../layout/Loading'
import Container from '../layout/Container'
import ProjectForm from '../project/ProjectForm'
import Message from '../layout/Message'
import ServiceForm from '../service/ServiceForm'
import ServiceCard from '../service/ServiceCard'

const Project = () => {

    const {id} = useParams()

    const [project, setProject] = useState([])
    const [services, setServices] = useState([])            //array vazio
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
    const [message, setMessage] = useState()
    const [messageType, setMessageType] = useState()

    useEffect(() => {                                           //Busca os dados do projeto
        fetch(`http://localhost:5000/projects/${id}`, {         //Rota dinamica com ID no final
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then((resp) => resp.json())
        .then((data) => {
            setProject(data)                                    //Seta o project com o conteúdo DATA que veio do banco
            setServices(data.services)                          //Seta o services com os servicos ja cadastrados
        })
        .catch((err) => console.log(err))
    }, [id])                                                    //Monitorando o ID

    const editPost = (project) => {
        setMessage('')                                          //Reinicia a mensagem para ela poder aparecer varias vezes caso o projeto seja atualizado varias vezes

        if (project.budget < project.cost){
            setMessage('O orçamento não pode ser menor que o custo do projeto!');
            setMessageType('error');
            return false                                                            //Para toda a função editPost
        }

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',                                                    //PATCH altera somente o que foi mudado, e não todo o registro
            headers: {                                                          
                'Content-Type': 'application/json',                              //Se comunica em JSON com a API
            },
            body: JSON.stringify(project),                                      //Enviar os dados como texto
        })
        .then((resp) => resp.json())                                              //Transforma a resposta para JSON
        .then((data) => {
            setProject(data)                                                    //Alterar o projeto da tela com os dados que vieram atualizados do banco
            setShowProjectForm(false)                                           //Para não mostrar mais o formulário
            setMessage('Projeto atualizado!');
            setMessageType('success');
        })
        .catch(err => console.log(err))
    }

    const createService = (project) => {
        setMessage('')                                                          //Reseta a mensagem
        const lastService = project.services[project.services.length - 1]       //Pega o ultimo serviço, o que acabou de ser adicionado

        lastService.id = uuidv4()                                               //Gera um ID pro React poder renderizar as listas

        const newCost = parseFloat(project.cost) + parseFloat(lastService.cost)

        //validação de valor máximo
        if (newCost > parseFloat(project.budget)){                              //Se o valor novo for maior que o valor de budget do projeto
            setMessage('Orçamento ultrapassado: verifique o valor do serviço!')
            setMessageType('error')
            project.services.pop()                                              //Remove o serviço que está no objeto do projeto
            return false                                                        //Termina a execução
        }

        //atualizar o cost do projeto adicionando o valor do serviço
        project.cost = newCost

        //Atualizar projeto
        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',                                                //Atualização somente os dados que forem alterados
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project),
        })
        .then(resp => resp.json())
        .then(data => {
            setShowServiceForm(false)
        })
        .catch(err => console.log(err))
    }

    const removeService = (id, cost) => {
        setMessage('')                                                                          //Reseta a mensagem
        const servicesUpdate = project.services.filter((service) => service.id !==  id)             //Cria uma variavel que recebe todos os servicos do state, menos o que foi excluído para nao precisar consultar no banco novamente na hora de exibir os servicos depois da exclusao
        
        const projectUpdate = project

        projectUpdate.services = servicesUpdate
        projectUpdate.cost = parseFloat(projectUpdate.cost - parseFloat(cost))                      //Removendo o custo do servico do custo do projeto

        fetch(`http://localhost:5000/projects/${projectUpdate.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(projectUpdate)
        })
        .then((resp) =>  resp.json())
        .then((data) => {
            setProject(projectUpdate)                       //Não precisa pegar do backend novamente, pois já foi removido no state
            setServices(servicesUpdate)
            setMessage('Serviço removido com sucesso')
            setMessageType('success')
        })
        .catch((err) => console.log(err))
    }

    const toggleProjectForm = () => {
        setShowProjectForm(!showProjectForm)                    //Vai trocar o estado atual do showProjectForm
    }
    
    const toggleServiceForm = () => {
        setShowServiceForm(!showServiceForm)                    //Vai trocar o estado atual do showServiceForm
    }

    return (<>
        {project.name ? (
            <div className={styles.project_details}>
                <Container customClass='column'>
                    {message && <Message type={messageType} msg={message} />}
                    <div className={styles.details_container}>
                        <h1>Projeto: {project.name}</h1>
                        <button className={styles.button} onClick={toggleProjectForm}>
                            {showProjectForm ? 'Fechar' : 'Editar projeto'}
                        </button>
                            {showProjectForm ? (
                                <div className={styles.project_edit}>
                                    <ProjectForm handleSubmit={editPost} buttonText='Salvar' projectData={project}/>
                                </div>
                            ) : (
                                <div className={styles.project_info}>
                                    <p>
                                        <span>Categoria:</span> {project.category.name}
                                    </p>
                                    <p>
                                        <span>Total do orçamento:</span> R${project.budget}
                                    </p>
                                    <p>
                                        <span>Total utilizado:</span> R${project.cost}
                                    </p>
                                </div>
                            )}
                    </div>
                    <div className={styles.service_form_container}>
                        <h2>Adicione um serviço</h2>
                        <button className={styles.button} onClick={toggleServiceForm}>
                            {showServiceForm ? 'Fechar' : 'Adicionar serviço'}
                        </button>
                        <div className={styles.project_info}>
                            {showServiceForm && (
                                <ServiceForm
                                    handleSubmit={createService}
                                    buttonText='Adicionar serviço'
                                    projectData={project}
                                 />
                            )}
                        </div>
                    </div>
                    <h2>Serviços</h2>
                    <Container customClass='start'>
                        {services.length === 0 && <p>Não existem serviços cadastrados</p>}
                        {services.length > 0 &&
                            services.map((service) => (
                                <ServiceCard
                                    id={service.id}
                                    name={service.name}
                                    cost={service.cost}
                                    description={service.description}
                                    key={service.id}
                                    handleRemove={removeService}
                                />
                            ))
                        }
                    </Container>
                </Container>
            </div>
        ): (
            <Loading />
        )}
    </>)
}

export default Project