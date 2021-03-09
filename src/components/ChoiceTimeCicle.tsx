import { useContext } from 'react';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/ChoiceTimeCicle.module.css';

export default function ChoiceTimeCicle() {

  const {
    getMinuteLeft,
    getMinuteRight,
    getSecondLeft,
    getSecondRight,
    defineTime } = useContext(CountdownContext);

  return (
    
         <>
           <h2 className={styles.title}>Escolha o seu Ciclo de tempo</h2>
   
           <div className={styles.choiceTimeCicleContainer}>
   
               <div>
                 <input type="number" placeholder="0" onChange={ (e) => {getMinuteLeft(Number(e.target.value))}}/>
                 <input type="number" placeholder="0" onChange={ (e) => {getMinuteRight(Number(e.target.value))}}/>  
               </div>
   
               <span>:</span>
   
               <div>
                 <input type="number" placeholder="0" onChange={ (e) => {getSecondLeft(Number(e.target.value))}}/>
                 <input type="number"placeholder="0" onChange={ (e) => {getSecondRight(Number(e.target.value))}}/>
               </div>
             
           </div>
   
            <button 
            className={styles.defineButton} 
            type="button"
            onClick={defineTime}
            >
              Definir ciclo de tempo
            </button>
       </>
       )
   
}
