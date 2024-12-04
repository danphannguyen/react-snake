import style from './GameOver.module.scss';

const GameOver = ({replay}) => {
    return (
        <div className={style.gameOver}>
            <button onClick={replay} className={style.btn}>Try again?</button>
        </div>
    );
}

export default GameOver;