import { useNavigate } from 'react-router-dom'                                       //permite redirecionar o usuário (quando der um Post por exemplo)

import ProjetoForm from '../project/ProjectForm'

import styles from './NewProject.module.css'

const NewProject = () => {
    
    const navigate = useNavigate();

    const createPost = (project) => {                                   //Metodo para postar dados no BD
        
        //Inicializando atributos
        //Se tivesse um backend real, isso seria feito lá.
        project.cos = 0
        project.services = []

        fetch('http://localhost:5000/projects', {                       //3. ...nesta rota.
            method: 'POST',                                             //2. ...pelo método POST...
            headers: {
                'Content-Type': 'application/json',                         //Vai se comunicar com JSON
            },
            body: JSON.stringify(project),                              //1. Vai mandar os dados do projeto como string...
        })
        .then((resp) => resp.json())                                        //Recebe uma resposta e transforma ela em JSON
        .then((data) => {                                                   //
            console.log(data)
            navigate('/projects', { state: {message: 'Projeto criado com sucesso!'}})           //redirecionamento com mensagem
        })
        .catch(err => console.log(err))                                     //Recebe um possível erro que der no servidor
    }



    return (
        <div className={styles.newproject_container}>
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto para poder adicionar os serviços.</p>
            <ProjetoForm handleSubmit={createPost} buttonText='Criar projeto'/>                      {/*Com handleSubmit=createPost, quando chamar o formulario vai dizer pra ele que está criando um novo projeto e não editando um existente, chamando a funcao CreatePost*/}
        </div>
    )
}

export default NewProject