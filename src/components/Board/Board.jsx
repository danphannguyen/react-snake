import { useEffect, useState, useRef } from 'react'
import Snake from '../Snake/Snake'
import gsap from 'gsap'
import styles from './Board.module.scss'
import Item from '../Item/Item'
import { defaultControls, flashUser, screamerUser, triggerMode, wizz, generateRandomCoordinates, reversedControls } from '../../utils/utils'
import GameOver from '../GameOver/GameOver'
import Submit from '../Submit/Submit'
import Scoreboard from '../Scoreboard/Scoreboard'
import useStore from '../../utils/store'

const Board = () => {

    const { mode, removeMode } = useStore();
    const [snakeData, setSnakeData] = useState([
        [0, 0],
        [10, 0]
    ])

    const [foodArray, setFoodArray] = useState([])
    const [trapArray, setTrapArray] = useState([])

    const [hasEnteredResults, setHasEnteredResults] = useState(false);

    const [gameOver, setGameOver] = useState(false)
    const [speed, setSpeed] = useState(0.3)
    const [score, setScore] = useState(0)
    const [death, setDeath] = useState(0);

    const timer = useRef(0)
    const foodTimer = useRef(0)
    const trapTimer = useRef(0)
    const direction = useRef('RIGHT')
    const canChangeDirection = useRef(true)

    const gameIsOver = () => {
        gsap.ticker.remove(gameloop)

        setDeath(death + 1);

        const video = document.getElementById("die-video");
        video.style.display = "block";
        video.currentTime = 0;
        video.play();
        video.addEventListener("ended", (event) => {
            video.style.display = "none"
        });

        setGameOver(true)
    }

    const isOutOfBorder = (head) => {

        if (head[0] < 0 || head[0] >= 500 || head[1] < 0 || head[1] >= 500) {
            return true
        }

        return false
    }

    const asEatenItem = ({ getter, setter }) => {
        // compare head of the snake with food coordinates
        const head = snakeData[snakeData.length - 1]

        const item = getter.find(_item => _item.x === head[0] && _item.y === head[1])
        if (item) {
            // update food array
            const newItemArray = getter.filter(_item => _item !== item);
            setter(newItemArray)

            const eatAudio = new Audio("/audio/eat.mp3")
            eatAudio.currentTime = 0;
            eatAudio.play();

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

        const snakeCollapsed = hasCollapsed(head)
        const outOfBorder = isOutOfBorder(head);
        const eatenFood = asEatenItem({
            getter: foodArray,
            setter: setFoodArray,
        });
        const eatenTrap = asEatenItem({
            getter: trapArray,
            setter: setTrapArray,
        })

        if (outOfBorder || snakeCollapsed) {
            gameIsOver()
        } else {
            if (eatenTrap === true) {
                // trap execution logic
                const effects = [flashUser, screamerUser, triggerMode, wizz];
                // const effects = [wizz];

                const selectedEffect =
                    effects[Math.floor(Math.random() * effects.length)];

                selectedEffect()
            }
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

    const hasCollapsed = (head) => {
        let snake = [...snakeData]

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

        mode.includes('Reversed') ? reversedControls(e, direction) : defaultControls(e, direction);

    }

    const addItem = ({ getter, setter }) => {
        // generate random x and y 
        const coordinates = generateRandomCoordinates(mode)

        const array = [...foodArray, ...trapArray];

        //test pour savoir si un item est déjà existant à cet endroit
        const itemAlreadyExistsHere = array.some(
            (item) => item.x === coordinates.x && coordinates.y === item.y
        );

        // si ça existe déjà, rappeler la fonction
        if (itemAlreadyExistsHere) {
            addItem({ getter, setter });
            return;
        }

        // update state
        setter((oldArray) => [...oldArray, coordinates])
    }

    const gameloop = (time, deltaTime, frame) => {
        timer.current += deltaTime * 0.001 // convert to seconds
        foodTimer.current += deltaTime * 0.001 // convert to seconds 
        trapTimer.current += deltaTime * 0.001 // convert to seconds 

        if (timer.current > (mode.includes("Impossible") ? 0.02 : speed)) {
            timer.current = 0;
            moveSnake();
            canChangeDirection.current = true;
        }

        // Gestion de l'apparition de la nourriture
        if (foodTimer.current > 1.5) {
            foodTimer.current = 0
            if (foodArray.length < 5) {
                addItem({ getter: foodArray, setter: setFoodArray });
            }
            if (foodArray.length >= 5) {
                // add food
                addItem({ getter: foodArray, setter: setFoodArray });

                // remove first food of the array
                setFoodArray((oldFoodArray) => {
                    oldFoodArray.shift()
                    return oldFoodArray
                })
            }
        }

        // Gestion de l'apparition des trap
        if (trapTimer.current > 0.75) {
            trapTimer.current = 0
            if (trapArray.length < 10) {
                addItem({ getter: trapArray, setter: setTrapArray });
            }
            if (trapArray.length >= 10) {
                // add food
                addItem({ getter: trapArray, setter: setTrapArray });
                // remove first food of the array
                setTrapArray((oldTrapArray) => {
                    oldTrapArray.shift()
                    return oldTrapArray
                })
            }
        }

    }

    const replay = () => {
        removeMode("Corner")
        removeMode("Impossible")
        removeMode("Halloween")
        removeMode("Reversed")
        setGameOver(false)
        setSnakeData([[0, 0], [10, 0]])
        setFoodArray([])
        setTrapArray([])
        setHasEnteredResults(false);
        setSpeed(0.3)
        setScore(0)
        direction.current = 'RIGHT'
        timer.current = 0
        foodTimer.current = 0
        const video = document.getElementById("die-video");
        video.style.display = "none";
        video.pause();
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
        <>
            {gameOver && <GameOver replay={replay} />}
            {gameOver && !hasEnteredResults && (
                <Submit
                    score={score}
                    death={death}
                    setHasEnteredResults={setHasEnteredResults}
                />
            )}
            {gameOver && <Scoreboard />}

            <div id='board' className={styles.boardTest}>
                <Snake data={snakeData} />

                <span className={styles.score}>Score: {score}</span>
                <span className={styles.death}>Death: {death}</span>

                {foodArray.map((coordinates) => (
                    <Item key={coordinates.id} coordinates={coordinates} type="food" />
                ))}

                {trapArray.map((coordinates) => (
                    <Item key={coordinates.id} coordinates={coordinates} type="trap" />
                ))}
            </div>
        </>

    )
}

export default Board