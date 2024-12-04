import useStore from "../../utils/store";
import s from "./Scoreboard.module.scss";
const Scoreboard = () => {
    const { results } = useStore();
    return (
        <div className={s.scoreboard}>
            <h1>Scoreboard</h1>
            <div className={s.results}>
                <div className={s.header}>
                    <span>Name</span>
                    <span>Score</span>
                    <span>Deaths</span>
                </div>
                {results.map((result, i) => (
                    <div className={s.result} key={result.name + i}>
                        <span>{result.name}</span>
                        <span>{result.score}</span>
                        <span>{result.death}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default Scoreboard;