import { useContext } from 'react'
import { ChallengeContext } from '../contexts/ChallengesContext'
import styles from '../styles/components/Profile.module.css'

export default function Profile() {

  const { level} = useContext(ChallengeContext);

  return (
    <div className={styles.profileContainer}>
      <img src="https://avatars.githubusercontent.com/u/60943819?v=4" alt="Wellington Ribeiro"/>
      <div>
        <strong>Wellington Ribeiro</strong>
        
        <p>
        <img src="icons/level.svg" alt="Level"/>
          Level {level}
        </p>
      </div>
    </div>
  )
}
