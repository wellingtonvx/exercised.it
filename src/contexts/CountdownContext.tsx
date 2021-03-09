import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { ChallengeContext } from './ChallengesContext';


interface CountdownContextData {
  time?: number,
  minutes: number,
  seconds: number,
  isActive: boolean,
  hasFinished: boolean,
  minuteRight:number,
  minuteLeft:number,
  secondRight:number,
  secondLeft:number,
  startCountdown: ()=> void,
  resetCountdown: ()=> void,
  defineTime: ()=> void,
  getMinuteRight: (minuteRight:number)=> void,
  getMinuteLeft: (minuteLeft:number)=> void,
  getSecondRight: (secondRight:number)=> void,
  getSecondLeft: (secondLeft:number)=> void,
}

interface CountdownProviderProps {
  children : ReactNode;/*ReactNode aceita qual quer coisa como componente filho*/
}

export const CountdownContext = createContext({} as CountdownContextData);

let countdownTimeOut : NodeJS.Timeout; /*Recebendo um parametro do time out do node */

export function CountdownProvider({children}:CountdownProviderProps){

  /*-----------------------ESTADOS E VARIAVEIS -------------------------------*/
  const {startNewChallenger } = useContext(ChallengeContext)

  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const[minuteRight, setMinuteRight] = useState(0)
  const[minuteLeft, setMinuteLeft] = useState(0)
  const[secondRight, setSecondRight] = useState(0)
  const[secondLeft, setSecondLeft] = useState(0)

  const minutes = Math.floor( time / 60); /*floor: aredonda pra baixo */
  const seconds = time % 60;

  //recebendo os valores de input
  let inputMminute = [minuteLeft, minuteRight]
  let inputSecond = [secondLeft, secondRight]
  
  //convertendo o array em numeros
  let ConvertedMinutes = Number(inputMminute.join().replace(',', ''));
  let ConvertSeconds = Number(inputSecond.join().replace(',', ''));


  /*--------------------------------------------------------------------------*/


  /* --------------------------FUNCTIONS -------------------------------------*/

  function startCountdown(){
    setIsActive(true)
  }

  function getMinuteRight(minuteRight:number){
    setMinuteRight(minuteRight)
  } 

  function getMinuteLeft(minuteLeft:number){
    setMinuteLeft(minuteLeft)
  }

  function getSecondRight(secondRight:number){
    setSecondRight(secondRight)
  } 

  function getSecondLeft(secondLeft:number){
    setSecondLeft(secondLeft)
  }

  function defineTime(){
    setIsActive(true);
      setTime((ConvertedMinutes * 60) + (ConvertSeconds))
  }

  function resetCountdown(){
    clearTimeout(countdownTimeOut)/*Cancelando a execução do setTimeout*/
    setIsActive(false);

    setMinuteLeft(0);
    setMinuteRight(0);
    setSecondLeft(0);
    setSecondRight(0);

    setHasFinished(false);
  }

    
  useEffect(() => {
    if(isActive && time > 0){
      countdownTimeOut = setTimeout( () => {
        setTime(time -1)
      }, 1000)
    }else if(isActive && time === 0 ){
      setHasFinished(true);
      setIsActive(true)
      startNewChallenger();

      setMinuteLeft(0);
      setMinuteRight(0);
      setSecondLeft(0);
      setSecondRight(0);

    }
    }
  , [isActive,time])

  /*------------------------------------------------------------------------- */

  return(
    <CountdownContext.Provider value={
      {
        minutes,
        seconds, 
        isActive, 
        hasFinished,
        minuteRight,
        minuteLeft,
        secondRight,
        secondLeft,
        startCountdown, 
        resetCountdown,
        getMinuteRight,
        getMinuteLeft,
        getSecondRight,
        getSecondLeft,
        defineTime
      }
      }>
      {children}
    </CountdownContext.Provider>
  );
}