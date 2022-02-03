import { useLocation } from 'react-router-dom'

import Message from "../layout/Message"

const Projects = () => {

    const location = useLocation()
    let message = ''
    if (location.state) {
        message = location.state.message
    }

    return (
        <div>
            <h1>PROJETOS</h1>
            {message && <Message msg={message} type='success'/>}             {/*Sabemos que quando vier pro Projects.js a mensagem vai ser sempre de sucesso.*/}
        </div>
    )
}

export default Projects