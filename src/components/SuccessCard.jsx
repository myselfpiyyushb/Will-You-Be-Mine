import HeartIcon from './HeartIcon'
import styles from './SuccessCard.module.css'

export default function SuccessCard({ escapeCount }) {
  return (
    <div className={styles.card}>
      <div className={styles.heartWrap}>
        <HeartIcon size={56} fill="#d4537e" className={styles.bigHeart} />
      </div>

      <h1 className={styles.title}>She said yes!</h1>

      <div className={styles.divider} />

      <p className={styles.message}>
        And just like that, you made everything a little more beautiful.
        This is only the beginning.
      </p>

      {escapeCount > 0 && (
        <p className={styles.counter}>
          The "No" tried to escape {escapeCount} time{escapeCount === 1 ? '' : 's'}.
        </p>
      )}
    </div>
  )
}
