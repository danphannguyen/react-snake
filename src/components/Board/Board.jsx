import { useEffect, useState, useRef } from 'react'
import Snake from '../Snake/Snake'
import gsap from 'gsap'
import styles from './Board.module.scss'

const Board = () => {
    const [snakeData, setSnakeData] = useState([
        [0, 0],
        [10, 0]
    ])
    const timer = useRef(0)
    const direction = useRef('RIGHT')
    const canChangeDirection = useRef(true)

    const moveSnake = () => {
        const newSnakeData = [...snakeData];
        let head = newSnakeData[newSnakeData.length - 1]

        switch (direction.current) {
            case 'RIGHT':
                head = [head[0] + 10, head[1]]
                break

            case 'LEFT':
                head = [head[0] - 10, head[1]]
                break

            case 'DOWN':
                head = [head[0], head[1] + 10]
                break

            case 'UP':
                head = [head[0], head[1] - 10]
                break

            default:
                break
        }

        newSnakeData.push(head)
        newSnakeData.shift()

        setSnakeData(newSnakeData)
    };

    const onKeyDown = e => {

        if (canChangeDirection.current === false) return
        canChangeDirection.current = false

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

    const gameloop = (time, deltaTime, frame) => {
        timer.current += deltaTime
        if (timer.current > 500) {
            timer.current = 0
            moveSnake()
            canChangeDirection.current = true
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', onKeyDown)
        gsap.ticker.add(gameloop)

        return () => {
            window.removeEventListener('keydown', onKeyDown)
            gsap.ticker.remove(gameloop)
        }
    }, [snakeData])

    return (
        <div className={styles.boardTest}>
            <Snake data={snakeData} />
        </div>
    )
}

export default Board