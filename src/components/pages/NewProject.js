import ProjetoForm from '../project/ProjectForm'
import styles from './NewProject.module.css'

const NewProject = () => {
    return (
        <div className={styles.newproject_container}>
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto para poder adicionar os serviços.</p>
            <ProjetoForm buttonText='Criar projeto'/>
        </div>
    )
}

export default NewProject