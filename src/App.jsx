import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import WordBlanks from './components/WordBlanks'
import { words } from './assets/words'
import Confetti from 'react-confetti'
import { useWindowSize } from 'react-use'

function App() {


  const [word,setWord] = useState(words[Math.floor(Math.random() * words.length)])

  const maxGuesses = 6

  const [message, setMessage] = useState('')

  const[gameId, setGameId] = useState(0)

  const { width, height } = useWindowSize()

  const [guesses, setGuesses] = useState(
    Array(maxGuesses).fill(null).map(() => Array(5).fill(''))
  )

  const [statuses, setStatuses] = useState(
    Array(maxGuesses).fill(null).map(() => Array(5).fill(''))
  )

  const [currentGuessIndex, setCurrentGuessIndex] = useState(0)

  const [newGameButton, setNewGameButton] = useState(false)

  const [gameWon, setGameWon] = useState(false)

  const updateGuess = (rowIndex, newGuess) => {
    const updatedGuesses = [...guesses]
    updatedGuesses[rowIndex] = newGuess
    setGuesses(updatedGuesses)
  }

  const updatedStatuses = (rowIndex, newStatus) => {
    const updatedStatuses = [...statuses]
    updatedStatuses[rowIndex] = newStatus
    setStatuses(updatedStatuses)
  }

  const nextGuess = () => {
    setCurrentGuessIndex((i) => Math.min(i + 1, maxGuesses - 1))
  }

  const resetGame = () => {
    setMessage('')
    setGuesses(Array(maxGuesses).fill(null).map(() => Array(5).fill('')))
    setStatuses(Array(maxGuesses).fill(null).map(() => Array(5).fill('')))
    setCurrentGuessIndex(0)
    setWord(words[Math.floor(Math.random() * words.length)])
    setNewGameButton(false)
    setGameWon(false)
    setGameId(prev => prev+1)
  }


  return (
    <>
      {gameWon && <Confetti width={width} height={height}/>}
      <h1>WORDLE</h1>
      {message && 
        <div>
          <h1>{message}</h1>
        </div>
      }
      {guesses.map((guess, i) => (
        <WordBlanks
          key={`${gameId}-${i}`}
          word={word}
          guess={guess}
          statuses={statuses[i]}
          rowIndex={i}
          isActive={i === currentGuessIndex}
          setMessage={setMessage}
          updateGuess={(newGuess) => updateGuess(i, newGuess)}
          updateStatuses={(newStatus) => updatedStatuses(i, newStatus)}
          nextGuess={nextGuess}
          resetGame={resetGame}
          currentGuessIndex={currentGuessIndex}
          maxGuesses={maxGuesses}
          setNewGameButton={setNewGameButton}
          setGameWon={setGameWon}
        />
      ))}
      {newGameButton && <button onClick={resetGame}>New Game</button>}
    </>
  )
}

export default App
