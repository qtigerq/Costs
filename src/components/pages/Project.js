import styles from './Project.module.css'

import { useParams } from 'react-router-dom'                    //Hook para pegar variáveis que vem pela URL
import { useState, useEffect } from 'react'

import Loading from '../layout/Loading'
import Container from '../layout/Container'

const Project = () => {

    const {id} = useParams()

    const [project, setProject] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)

    useEffect(() => {                                           //
        fetch(`http://localhost:5000/projects/${id}`, {         //Rota dinamica com ID no final
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then((resp) => resp.json())
        .then((data) => {
            setProject(data)
        })
        .catch((err) => console.log(err))
    }, [id])                                                    //Monitorando o ID

    const toggleProjectForm = () => {
        setShowProjectForm(!showProjectForm)                    //Vai trocar o estado atual do showProjectForm
    }

    return (<>
        {project.name ? (
            <div className={styles.project_details}>
                <Container customClass='column'>
                    <div className={styles.details_container}>
                        <h1>Projeto: {project.name}</h1>
                        <button className={styles.button} onClick={toggleProjectForm}>
                            {showProjectForm ? 'Fechar' : 'Editar projeto'}
                        </button>
                            {showProjectForm ? (
                                <div className={styles.project_info}>
                                    <p>detalhes do projeto</p>
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
                </Container>
            </div>
        ): (
            <Loading />
        )}
    </>)
}

export default Project