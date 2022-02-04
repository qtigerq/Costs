import { useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

import Message from "../layout/Message"
import Container from '../layout/Container'
import LinkButton from '../layout/LinkButton'
import ProjectCard from '../project/ProjectCard'
import Loading from '../layout/Loading'

import styles from './Projects.module.css'

const Projects = () => {

    const [projects, setProjects] = useState([])
    const [removeLoading, setRemoveLoading] = useState(false)           //Como vai aparecer e sumir, criamos um removedor
    const [projectMessage, setProjectMessage] = useState('')            //State de mensagem

    const location = useLocation()
    let message = ''
    if (location.state) {
        message = location.state.message
    }

    useEffect(() => {                                                   //Vai dar um GET nos projetos do db.json
        fetch('http://localhost:5000/projects', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data)
            setProjects(data)
            setRemoveLoading(true)                                      //Ao terminar de carregar o projeto, remove o Loading
        })
        .catch((err) => console.log(err))
    }, [])

    const removeProject = (id) => {
        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(resp => resp.json())
        .then(() => {                                                           //Como não trabalha com dados, omitimos a variavel data
            setProjects(projects.filter((project) => project.id !== id))        //Faz um filtro dos projetos excluindo aquele com ID que esta sendo excluído. Assim, exclui-se o projeto no front e ele já foi excluído no Banco de Dados, assim não precisa fazer uma nova requisição trazendo todos os projetos cadastrados novamente
            setProjectMessage('Projeto excluído com sucesso!')
        })
        .catch(err => console.log(err))

    }

    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus Projetos</h1>
                <LinkButton to='/newproject' text='Novo projeto'/>
            </div>
            {message && <Message msg={message} type='success'/>}                 {/*Sabemos que quando vier pro Projects.js a mensagem vai ser sempre de sucesso.*/}
            {projectMessage && <Message msg={projectMessage} type='success'/>}   {/*Mensagem de projeto excluído*/}
            <Container customClass='start'>
                {projects.length > 0 &&                                          //Se existirem projetos...
                    projects.map((project) => (
                       <ProjectCard
                        name={project.name}
                        id={project.id}
                        budget={project.budget}
                        category={project.category.name}
                        key={project.id}                                         //O React precisa de uma key para se orientar nas atualizações de seus componentes.
                        handleRemove={removeProject}
                       />
                    ))
                }
                {!removeLoading && <Loading />}                                  {/*Por padrão o Loading vai aparecer, quem remove ele é o Fetch que busca os dados.*/}
                {removeLoading && projects.length === 0 && (                     //Se o Loading tiver sido removido e não houverem projetos cadastrados...
                    <p>Não existem projetos cadastrados!</p>
                )}
            </Container>
        </div>
    )
}

export default Projects