import { useEffect, useState, useRef } from 'react'
import Snake from '../Snake/Snake'
import gsap from 'gsap'
import styles from './Board.module.scss'
import Food from '../Food/Food'
import { generateRandomCoordinates } from '../../utils/utils'
import GameOver from '../GameOver/GameOver'

const Board = () => {
    const [snakeData, setSnakeData] = useState([
        [0, 0],
        [10, 0]
    ])

    const [foodArray, setFoodArray] = useState([])
    const [gameOver, setGameOver] = useState(false)
    const [speed, setSpeed] = useState(0.3)
    const [score, setScore] = useState(0)

    const timer = useRef(0)
    const foodTimer = useRef(0)
    const direction = useRef('RIGHT')
    const canChangeDirection = useRef(true)

    const gameIsOver = () => {
        gsap.ticker.remove(gameloop)
        setGameOver(true)
    }

    const isOutOfBorder = () => {
        const head = snakeData[snakeData.length - 1]

        if (head[0] < 0 || head[0] >= 500 || head[1] < 0 || head[1] >= 500) {
            return true
        }

        return false
    }

    const asEatenFood = () => {
        // compare head of the snake with food coordinates
        const head = snakeData[snakeData.length - 1]

        const food = foodArray.find(_food => _food.x === head[0] && _food.y === head[1])
        if (food) {
            // update food array
            const newFoodArray = foodArray.filter(_food => _food !== food);
            setFoodArray(newFoodArray)

            return true
        } else {
            return false
        }
    }

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

        const snakeCollapsed = hasCollapsed()
        const outOfBorder = isOutOfBorder();
        const eatenFood = asEatenFood();

        if (outOfBorder || snakeCollapsed) {
            gameIsOver()
        } else {
            if (eatenFood === true) {
                if (speed > 0.02) {
                    setSpeed(speed => speed - 0.02)
                }
                setScore(score => score + 10)
                newSnakeData.unshift([])
            }
            setSnakeData(newSnakeData)
        }

    };

    const hasCollapsed = () => {
        let snake = [...snakeData]
        let head = snake[snake.length - 1]

        snake.pop()
        for (let i = 0; i < snake.length; i++) {
            if (head[0] === snake[i][0] && head[1] === snake[i][1]) {
                return true
            }
        }

        return false
    }

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

    const addFood = () => {
        // generate random x and y 
        const coordinates = generateRandomCoordinates()

        // update state
        setFoodArray((oldFoodArray) => [...oldFoodArray, coordinates])
    }

    const gameloop = (time, deltaTime, frame) => {
        timer.current += deltaTime * 0.001 // convert to seconds
        foodTimer.current += deltaTime * 0.001 // convert to seconds 

        if (timer.current > speed) {
            timer.current = 0
            moveSnake()
            canChangeDirection.current = true
        }

        if (foodTimer.current > 1.5) {
            foodTimer.current = 0

            if (foodArray.length < 5) {
                addFood()
            }

            if (foodArray.length >= 5) {
                // add food
                addFood()

                // remove first food of the array
                setFoodArray((oldFoodArray) => {
                    oldFoodArray.shift()
                    return oldFoodArray
                })
 
            }
            

        }
    }

    const replay = () => {
        setGameOver(false)
        setSnakeData([ [0, 0],[10, 0] ])
        setFoodArray([])
        setSpeed(0.3)
        setScore(0)
        direction.current = 'RIGHT'
        timer.current = 0
        foodTimer.current = 0
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

            <span className={styles.score}>Score: {score}</span>

            {gameOver && <GameOver replay={replay}/>}

            {foodArray.map((coordinates) => (
                <Food key={coordinates.id} coordinates={coordinates} />
            ))}
        </div>
    )
}

export default Board