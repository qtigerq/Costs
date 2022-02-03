import { useState, useEffect } from 'react'

import styles from './Message.module.css'

const Message = ({type, msg}) => {

    const [visible, setVisible] = useState(false)                           //Começa não exibindo.

    useEffect(() => {                                                       //Vai ser usado para fazer um temporizador da mensagem, pra ela sumir depois de alguns segundos.
        if (!msg) {                                                         //Se não tiver mensagem...
            setVisible(false)                                               //...seta o visible como false
            return                                                          //... e retorna.
        }

        setVisible(true)                                                    // Seta visible como TRUE (se não tiver dado Return no if anterior)

        const timer = setTimeout(() => {                                    //Depois de 3 segundos, seta o Visible como false.
            setVisible(false)
        }, 3000)


        return () => clearTimeout(timer)                                    //Retorna limpando o Timeout para um uso posterior
    }, [msg])                                                               //O useEffect sempre é vinculado a alguém

    return (
        <>  {/*Usando o fragment, é possível usar um IF para que se não houver mensagem, não apareça a DIV na tela, nem mesmo vazia, visto que ela já tem styles embutidas*/}
            {visible && (                                                   //Se visible==true
                <div className={`${styles.message} ${styles[type]}`}>       {/*Uma classe fixa e outra dinamica que vem do props.*/}
                    {msg}
                </div>
            )}
        </>
    )
}

export default Message