import uniqid from "uniqid"

export const generateRandomCoordinates = (mode) => {

    console.log(mode);
    const id = uniqid()
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