import { useState, useRef } from 'react'
import Petal from './components/Petal'
import QuestionCard from './components/QuestionCard'
import SuccessCard from './components/SuccessCard'
import styles from './App.module.css'

const INITIAL_PETALS = Array.from({ length: 10 }, (_, i) => i)

export default function App() {
  const [answered, setAnswered] = useState(false)
  const [escapeCount, setEscapeCount] = useState(0)
  const [extraPetals, setExtraPetals] = useState([])
  const containerRef = useRef(null)

  const handleYes = () => {
    setAnswered(true)
    setExtraPetals(Array.from({ length: 14 }, (_, i) => i + 100))
  }

  const handleEscape = (count) => {
    setEscapeCount(count)
  }

  return (
    <div className={styles.wrap} ref={containerRef}>
      {INITIAL_PETALS.map((i) => (
        <Petal key={i} index={i} />
      ))}
      {extraPetals.map((i) => (
        <Petal key={i} index={i} extra />
      ))}

      {answered ? (
        <SuccessCard escapeCount={escapeCount} />
      ) : (
        <QuestionCard
          onYes={handleYes}
          onEscape={handleEscape}
          containerRef={containerRef}
        />
      )}
    </div>
  )
}
