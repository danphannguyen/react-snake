import styles from './Snake.module.scss';

const Snake = ({ data }) => {

    return (
        <>
            {data.map((dot, i) => (
                    <div key={i} className={styles.snakeDot} style={{ 
                        transform: `translate(${dot[0]}px, ${dot[1]}px)`
                    }}></div>
                )
            )}
        </>
    )
}

export default Snake;