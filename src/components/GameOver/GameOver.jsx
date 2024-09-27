import style from './GameOver.module.scss';

const GameOver = ({replay}) => {
    return (
        <div className={style.gameOver}>
            <h1>Game Over</h1>
            <button onClick={replay}>Try again?</button>
        </div>
    );
}

export default GameOver;