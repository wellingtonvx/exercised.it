import Head from 'next/head'
import {GetServerSideProps} from 'next'

import { CountdownProvider } from '../contexts/CountdownContext';

import {ChallengeBox} from '../components/ChallengeBox'
import CompletedChalenges from '../components/CompletedChalenges'
import Countdown from '../components/Countdown'
import ExperienceBar from '../components/ExperienceBar'
import Profile from '../components/Profile'

import styles from '../styles/pages/Home.module.css'
import { ChallnegesProvider } from '../contexts/ChallengesContext';
import ChoiceTimeCicle from '../components/ChoiceTimeCicle';

interface HomeProps {
  level:number,
  currentExperience:number,
  challengesCompleted:number
}

export default function Home(props:HomeProps) {


  return  (
    <ChallnegesProvider 
    level={props.level} 
    currentExperience={props.currentExperience} 
    challengesCompleted={props.challengesCompleted}
    >
        <div className={styles.container}>

          <Head>
            <title>Inicio | exercised.it</title>
          </Head>

          <ExperienceBar/>

          <CountdownProvider>
              <section>

                <div>
                  <Profile/>
                  <CompletedChalenges/>
                  <Countdown />
                </div>

                <div>
                 
                  <ChallengeBox/>
                  
                </div>

              </section>
          </CountdownProvider>
        </div>
    </ChallnegesProvider>
  )
}

export const getServerSideProps:GetServerSideProps = async (contexts) => {

  const { level, currentExperience, challengesCompleted } = contexts.req.cookies;

  return {
    props: {
      level:Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted : Number(challengesCompleted)
    }
  }
}