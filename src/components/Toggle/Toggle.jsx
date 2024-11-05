import { useEffect, useState } from "react";
import s from "./Toggle.module.scss"
import useStore from "../../utils/store";

const Toggle = ({ mode }) => {

    const {mode: storeMode, addMode, removeMode } = useStore();

    const handleClick = () => {
        storeMode.includes(mode) ? removeMode(mode) : addMode(mode)
    }

    // Affiche dans la console la liste des modifier
    // useEffect(() => {
    //     console.log(storeMode);
    // }, [storeMode])

    return (
        <div className={s.wrapper} onClick={() => handleClick()}>
            <span className={s.mode}>{mode}</span>
            <div className={s.toggle}>
                <div className={`${s.switch} ${storeMode.includes(mode) ? s.switch_active : ""}`}>
                </div>
            </div>
        </div>
    );
};

export default Toggle