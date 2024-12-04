import s from './Snake.module.scss';
import useStore from "../../utils/store";

const Snake = ({ data }) => {

    const { skin } = useStore();
    const getStyle = (dot, i) => {

        let background = null;

        let actualSkin = skin ? skin : "/skin.png"

        if (data[data.length - 1] === dot) {
            background = `url(${actualSkin}) 0 0`;
        } else {
            background = `url(${actualSkin}) ${10 * i}px 10px`;
        }

        const style = {
            transform: `translate(${dot[0]}px, ${dot[1]}px)`,
            background: background,
        };

        return style;
    };

    return (
        <>
            {data.map((dot, i) => (
                <div key={i} className={s.snakeDot} style={getStyle(dot, i)}></div>
            )
            )}
        </>
    )
}

export default Snake;