import uniqid from "uniqid"

export const generateRandomCoordinates = () => {

    const id = uniqid()
    let min = 0
    let max = 49

    // generate random x and y coordinates between min, max
    let x, y 
    x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2
    x*=10

    y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2
    y*=10

    return {x, y, id}
}