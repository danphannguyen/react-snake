import styles from './Item.module.scss';
const Item = ({ coordinates, type }) => {
    const style = {
        transform: `translate(${coordinates.x}px, ${coordinates.y}px)`
    }

    return (
        <div className={`${styles.item} ${styles[`item_${type}`]}`} style={style}>
        </div>
    );
}

export default Item;