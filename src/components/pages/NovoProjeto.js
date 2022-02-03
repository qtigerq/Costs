import ProjetoForm from '../projeto/ProjetoForm'
import styles from './NovoProjeto.module.css'

const NovoProjeto = () => {
    return (
        <div className={styles.novoprojeto_container}>
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto para poder adicionar os serviços.</p>
            <ProjetoForm buttonText='Criar projeto'/>
        </div>
    )
}

export default NovoProjeto