import { useMemo } from 'react'
import styles from './Petal.module.css'

const COLORS = ['#f9a8c9', '#f4c2d8', '#e8d5f0', '#fadadd', '#f9c8de']
const SHAPES = [
  'border-radius: 50% 0 50% 0',
  'border-radius: 0 50% 0 50%',
  'border-radius: 50%',
]

export default function Petal({ index, extra = false }) {
  const style = useMemo(() => {
    const seed = index * 137.5 + (extra ? 500 : 0)
    const pseudo = (n) => ((Math.sin(seed * n) + 1) / 2)

    return {
      left: `${pseudo(1) * 100}%`,
      width: `${8 + pseudo(2) * 6}px`,
      height: `${10 + pseudo(3) * 6}px`,
      background: COLORS[Math.floor(pseudo(4) * COLORS.length)],
      borderRadius: SHAPES[Math.floor(pseudo(5) * SHAPES.length)].replace('border-radius: ', ''),
      animationDuration: `${5 + pseudo(6) * 5}s`,
      animationDelay: `${pseudo(7) * 4}s`,
      opacity: 0,
    }
  }, [index, extra])

  return <div className={styles.petal} style={style} aria-hidden="true" />
}
