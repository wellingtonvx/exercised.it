import { useContext } from 'react'
import { ChallengeContext } from '../contexts/ChallengesContext'
import styles from '../styles/components/ExperienceBar.module.css'

export default function ExperienceBar() {

  const { currentExperience, expericenToNextLevel } = useContext(ChallengeContext)

  const percentToNextLevel = Math.round(currentExperience * 100) / expericenToNextLevel;

  return (
    <header className={styles.experienceBar}>
      <span>0 xp</span>
         <div>
           <div style={{ width: `${percentToNextLevel}%`}}/>
           <span 
              className={styles.currentExperience} 
              style={{left: `${percentToNextLevel}%`}}
              >
                {currentExperience} xp
            </span>
         </div>
      <span>{expericenToNextLevel} xp</span>
    </header>
  )
}
