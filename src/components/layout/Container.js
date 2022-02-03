import styles from './Container.module.css'

const Container = (props) => {
    return (
        <div className={`${styles.container} ${styles[props.customClass]}`}>
            {props.children}                                    {/*Os elementos filhos do Container serão encaixados dentro da div do Container*/}
        </div>
    )
}

export default Container