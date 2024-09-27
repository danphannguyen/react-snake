import styles from './Food.module.scss';
const Food = ({ coordinates }) => {
    const style = {
        transform: `translate(${coordinates.x}px, ${coordinates.y}px)`
    }

    return (
        <div className={styles.food} style={style}>
        </div>
    );
}

export default Food;