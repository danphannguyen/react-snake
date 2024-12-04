import uniqid from "uniqid"
import gsap from "gsap";
import useStore from "./store";

const flashBangAudio = new Audio("/audio/csgo-flashbang.mp3")
const screamerAudio = new Audio("/audio/screamer.mp3")

let flashTween = null;

export const flashUser = () => {
    if (flashTween) flashTween.kill();

    flashBangAudio.currentTime = 0;
    flashBangAudio.play();
    document.querySelector('.flashbang').style.opacity= "1";

    flashTween = gsap.to('.flashbang', {
        opacity: 0,
        duration: 2,
        delay: 0.25,
    })
    
}

let screamerTween = null;

export const screamerUser = () => {
    if (screamerTween) screamerTween.kill();

    screamerAudio.currentTime = 0;
    screamerAudio.play();
    document.querySelector('.screamer').style.opacity= "1";

    screamerTween = gsap.to('.screamer', {
        opacity: 0,
        duration: 2,
        delay: 0.25,
    })

}

export const triggerMode = () => {
    const modes = ['Impossible', 'Corner', 'Reversed'];

    const selectedMode =
        modes[Math.floor(Math.random() * modes.length)];

    useStore.getState().addMode(selectedMode)

    setTimeout(() => {
        useStore.getState().removeMode(selectedMode)
    }, 1000)
}

export const wizz = () => {
    gsap.to('#board', {
        duration: 0.1,
        x: "+=20%",
        yoyo: true,
        repeat: 9,
    })
}

export const generateRandomCoordinates = (mode) => {

    // console.log(mode);
    const id = uniqid();
    let min = 0
    let max = 49

    // generate random x and y coordinates between min, max
    let x, y

    if (mode.includes("Corner")) {
        const side = Math.random();

        if (side < 0.25) {
            x = min
            y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2
        } else if (side >= 0.25 && side <= 0.5) {
            x = max
            y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2
        } else if (side >= 0.5 && side <= 0.75) {
            y = max
            x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2
        } else if (side > 0.75) {
            y = min
            x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2
        }
    } else {
        x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2


        y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2

    }

    x *= 10
    y *= 10
    return { x, y, id }
}

export const defaultControls = (e, direction) => {
    switch (e.keyCode) {
        case 38: // key up
            if (direction.current !== 'DOWN') {
                direction.current = 'UP'
            }
            break

        case 40: // key down
            if (direction.current !== 'UP') {
                direction.current = 'DOWN'
            }
            break

        case 37: // key left
            if (direction.current !== 'RIGHT') {
                direction.current = 'LEFT'
            }
            break

        case 39: // key right
            if (direction.current !== 'LEFT') {
                direction.current = 'RIGHT'
            }
            break

        default:
            break
    }
}

export const reversedControls = (e, direction) => {
    switch (e.keyCode) {
        case 38: // key up
            if (direction.current !== 'UP') {
                direction.current = 'DOWN'
            }
            break

        case 40: // key down
            if (direction.current !== 'DOWN') {
                direction.current = 'UP'
            }
            break

        case 37: // key left
            if (direction.current !== 'LEFT') {
                direction.current = 'RIGHT'
            }
            break

        case 39: // key right

            if (direction.current !== 'RIGHT') {
                direction.current = 'LEFT'
            }
            break

        default:
            break
    }
}