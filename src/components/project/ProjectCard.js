import { Link } from 'react-router-dom'

import styles from './ProjectCard.module.css'

import {BsPencil, BsFillTrashFill} from 'react-icons/bs'

const ProjectCard = ({id, name, budget, category, handleRemove}) => {

    const remove = (event) => {
        event.preventDefault()                            //Não deixa o botão dar reload na página
        handleRemove(id)
    }

    return (
        <div className={styles.project_card}>
            <h4>{name}</h4>
            <p>
                <span>Orçamento:</span> R${budget}
            </p>
            <p className={styles.category_text}>
                <span className={`${styles[category.toLowerCase()]}`}></span> {category}            {/*O className é setado de acordo com o nome da categoria, transformado em minusculo*/}
            </p>
            <div className={styles.project_card_actions}>
                <Link to='/'>
                    <BsPencil />Editar
                </Link>
                <button onClick={remove}>
                    <BsFillTrashFill /> Excluir
                </button>
            </div>
        </div>
    )
}

export default ProjectCard