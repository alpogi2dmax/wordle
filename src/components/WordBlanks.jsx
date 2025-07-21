import React, { useState, useRef, useEffect } from "react"
import { checkWordValid } from "./checkWordValid"

function WordBlanks(props)  {


//       word,
//   guess,
//   statuses,
//   rowIndex,
//   isActive,
//   updateGuess,
//   updateStatuses,
//   nextGuess,

    const refs = useRef([...Array(5)].map(() => React.createRef()))

    useEffect(() => {
        if (props.isActive && props.guess.every(letter => letter === '')) {
            refs.current[0].current.focus()
        }
    }, [props.isActive, props.guess])

    const handleChange = async (e, index) => {
        const val = e.target.value.toUpperCase()
        if (val.length <= 1 && /^[A-Z]?$/.test(val)) {

            const newGuess = [...props.guess]
            newGuess[index] = val
            props.updateGuess(newGuess)

            if (val && index < refs.current.length - 1) {
                refs.current[index + 1].current.focus()
            }

            if (newGuess.every(letter => letter !== '')) {
                const guessWord = newGuess.join('').toLowerCase()
                const isValid = await checkWordValid(guessWord)
                
                if (!isValid) {
                    props.setMessage('Not a valid English word!')
                    setTimeout(() => props.setMessage(''), 5000)
                    props.updateStatuses(Array(5).fill('invalid'))
                    return
                }

                const correctWord = props.word.toUpperCase().split('')
                const newStatusRow = newGuess.map((letter, i) => {
                    if (letter === correctWord[i]) return 'correct'
                    if (correctWord.includes(letter)) return 'included'
                    return 'incorrect'
                })
                props.updateStatuses(newStatusRow)

                if (guessWord.toUpperCase() === props.word.toUpperCase()) {
                    props.setMessage("You guessed it!")
                    props.setNewGameButton(true)
                    props.setGameWon(true)
                    return
                }

                if (props.maxGuesses === props.currentGuessIndex+1) {
                    props.setMessage(`The word is ${props.word.toUpperCase()}. Try again.`)
                    props.setNewGameButton(true)
                }

                props.nextGuess()
            }
        }

    }

    const handleKeyDown = async (e, index) => {

        

        if (e.key === 'Backspace' && !props.guess[index] && index > 0) {
            refs.current[index - 1].current.focus()    
        }
    }

    return (
        <form className='word-blank'>
            {props.guess.map((letter, i) => (
                <input
                    key={i}
                    ref={refs.current[i]}
                    type='text'
                    value={letter}
                    onChange={(e) => props.isActive && handleChange(e, i)}
                    onKeyDown={(e) => props.isActive && handleKeyDown(e, i)}
                    maxLength={1}
                    className={props.statuses[i]}
                    disabled={!props.isActive}
                    style={{
                        width: '80px',
                        height: '80px',
                        fontSize: '2rem',
                        textAlign: 'center',
                        backgroundColor:
                            props.statuses[i] === 'correct'
                            ? 'green'
                            : props.statuses[i] === 'included'
                            ? 'orange'
                            : props.statuses[i] === 'incorrect'
                            ? 'red'
                            : 'black',
                        color: 'white',
                        marginRight: '10px',
                        border:'none',
                        outline: props.isActive ? '2px solid white': 'none'
                        
                    }}
                />
            ))}
        </form>
    )
}

export default WordBlanks