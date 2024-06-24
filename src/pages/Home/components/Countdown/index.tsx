import { useContext, useEffect } from "react";
import { CountDownContainer, Separator } from "./styles";
import { differenceInSeconds } from "date-fns";
import { CyclesContext } from "../../../../contexts/CyclesContext";


export default function Countdown() {
  const { 
    activeCycle,
    activeCycleId, 
    markCurrentCycleAsFinished, 
    amountSecondsPassed, 
    setAmountSeconds 
  } = useContext(CyclesContext);

  const totalSecondsConverted = activeCycle ? activeCycle.minutesAmount * 60 : 0;
  
  useEffect(() => {
    let interval: number;

    if( activeCycle ) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds( 
          new Date(), 
          new Date(activeCycle.startDate) 
        );

        if (secondsDifference >= totalSecondsConverted ) {
          markCurrentCycleAsFinished();
          setAmountSeconds(totalSecondsConverted);
          clearInterval(interval);
        } else {
          setAmountSeconds( secondsDifference );
        }
      }, 1000);
    }

    return () => {
      clearInterval( interval );
    }

  }, [ 
      activeCycle, 
      totalSecondsConverted, 
      activeCycleId, 
      markCurrentCycleAsFinished, 
      setAmountSeconds 
    ]);

  const currentSeconds = activeCycle ? totalSecondsConverted - amountSecondsPassed : 0;
  const minutesAmount = Math.floor( currentSeconds / 60 );
  const secondsAmount = currentSeconds % 60;

  const minutes = String( minutesAmount ).padStart( 2, '0' );
  const seconds = String( secondsAmount ).padStart( 2, '0' );

  useEffect(() => {
    if(activeCycle) {
      document.title = `${minutes}:${seconds}`;
    }
  }, [ minutes, seconds, activeCycle ]);

    return (
        <CountDownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountDownContainer>
    )
}