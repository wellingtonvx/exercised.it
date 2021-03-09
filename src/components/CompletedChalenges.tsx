import { useContext } from 'react'
import { ChallengeContext } from '../contexts/ChallengesContext'
import styles from '../styles/components/CompletedChanlenge.module.css'

export default function CompletedChalenges() {

  const {challengesCompleted } = useContext(ChallengeContext);

  return (
    <div className={styles.completedChalengesContainer}>
      <span>Desafios completos</span>
      <span>{challengesCompleted}</span>
    </div>
  )
}
