import { useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

import Message from "../layout/Message"
import Container from '../layout/Container'
import LinkButton from '../layout/LinkButton'
import ProjectCard from '../project/ProjectCard'

import styles from './Projects.module.css'

const Projects = () => {

    const [projects, setProjects] = useState([])

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
        })
        .catch((err) => console.log(err))
    }, [])

    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus Projetos</h1>
                <LinkButton to='/newproject' text='Novo projeto'/>
            </div>
            {message && <Message msg={message} type='success'/>}             {/*Sabemos que quando vier pro Projects.js a mensagem vai ser sempre de sucesso.*/}
            <Container customClass='start'>
                {projects.length > 0 &&                                      //Se existirem projetos...
                    projects.map((project) => (
                       <ProjectCard
                        name={project.name}
                        id={project.id}
                        budget={project.budget}
                        category={project.category.name}
                        key={project.id}                                    //O React precisa de uma key para se orientar nas atualizações de seus componentes.
                       /> 
                    ))}
            </Container>
        </div>
    )
}

export default Projects