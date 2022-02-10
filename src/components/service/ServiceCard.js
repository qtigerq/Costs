import styles from '../project/ProjectCard.module.css'

import { BsFillTrashFill } from 'react-icons/bs'

const ServiceCard = ({id, name, cost, description, handleRemove}) => {

    const remove = (event) => {
        event.preventDefault()
        handleRemove(id, cost)                          //Precisamos do cost para deduzir o custo do servico no projeto
    }

    return (
        <div className={styles.project_card}>
            <h4>{name}</h4>
            <p>
                <span>Custo total:</span> R${cost}
            </p>
            <p>{description}</p>
            <div className={styles.project_card_actions}>
                <button onClick={remove}>
                    <BsFillTrashFill />
                    Excluir
                </button>
            </div>
        </div>
    )
}

export default ServiceCard