import { createContext, useState, ReactNode, useEffect} from  'react';
import challenges from '../../challenges.json';

import Cookies from 'js-cookie'
import LevelUpModal from '../components/LevelUpModal';

interface ChallengerProviderProps {
  children : ReactNode,/*ReactNode aceita qual quer coisa como componente filho*/
  level:number,
  currentExperience:number,
  challengesCompleted:number
}

interface Challenge {
  type: 'body' | 'eye',
  description: string,
  amount: number
}

interface ChallengeContextData {
  level: number, 
  currentExperience: number,
  challengesCompleted: number,
  expericenToNextLevel: number,
  activeChallenge:Challenge;
  levelUp: () => void,
  startNewChallenger: () => void,
  resetChallenge: () => void,
  completeChallenge: () => void,
  closeLevelUpModal: () => void
}

export const ChallengeContext = createContext({} as ChallengeContextData)

export function ChallnegesProvider({children, ...rest}:ChallengerProviderProps) {

  /*-----------------------ESTADOS E VARIAVEIS --------------------------------*/
  //dois pontos de interrogação faz uma verificação, se o level não existir vai ser colocado o numero 1
  const [level, setLevel] = useState(rest.level ?? 1);
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
  const [challengesCompleted, setChanllegesComplted] = useState(rest.challengesCompleted ?? 0);

  const [activeChallenge, setActiveChallenge] = useState(null);
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

  const expericenToNextLevel = Math.pow((level + 1) * 5, 2); 

  /*--------------------------------------------------------------------------*/


  /* --------------------------FUNCTIONS -------------------------------------*/

  useEffect( () => {
    Notification.requestPermission();
  }, [])

  useEffect( () => {

    Cookies.set('level', String(level))
    Cookies.set('currentExperience', String(currentExperience))
    Cookies.set('challengesCompleted', String(challengesCompleted))

  }, [level, currentExperience, challengesCompleted])

  function levelUp(){
    setLevel( level + 1)
    setIsLevelUpModalOpen(true);
  }

  function closeLevelUpModal(){
    setIsLevelUpModalOpen(false);
  }

  function startNewChallenger(){
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
    const challenge = challenges[randomChallengeIndex]

    setActiveChallenge(challenge)

    new Audio('/notification.mp3').play();

    if(Notification.permission === 'granted'){
      new Notification('Novo desafio!!!', {
        body: `Valendo ${challenge.amount} xp!`
      })
    }
  }

  function resetChallenge(){
    setActiveChallenge(null)
  }

  function completeChallenge(){

    if(!activeChallenge){
      return;
    }

    const { amount } = activeChallenge;

    let finalExperience = currentExperience + amount;

    if( finalExperience >= expericenToNextLevel) {
      finalExperience = finalExperience - expericenToNextLevel;
      levelUp();
    }

    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setChanllegesComplted(challengesCompleted + 1);
  }

  /*------------------------------------------------------------------------- */

  return (
    <ChallengeContext.Provider value={
        {
          level, 
          currentExperience, 
          challengesCompleted, 
          activeChallenge,
          expericenToNextLevel,
          levelUp,
          startNewChallenger,
          resetChallenge,
          completeChallenge,
          closeLevelUpModal
        }
      }>
      {children}

     { isLevelUpModalOpen && <LevelUpModal/>}
    </ChallengeContext.Provider>
  )
}