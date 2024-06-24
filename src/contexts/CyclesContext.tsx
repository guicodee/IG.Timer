import { ReactNode, createContext, useState, useReducer, useEffect } from "react"
import { Cycle, cyclesReducer } from "../reducers/cycles/reducer"
import { addNewCycleAction, interruptedDateAction, markCurretCycleAsFinishedAction } from "../reducers/cycles/actions"
import { differenceInSeconds } from "date-fns"

interface CreateCycleData {
  task: string
  minutesAmount: number
}

interface CyclesContextType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  markCurrentCycleAsFinished: () => void
  setAmountSeconds: (seconds: number) => void
  createNewCycle: (data: CreateCycleData) => void
  InterruptCurrentCycle: () => void
}
  
export const CyclesContext = createContext({} as CyclesContextType);

interface CyclesContextProviderProps {
  children: ReactNode
}

export function CyclesContextProvider({ children, }: CyclesContextProviderProps) {
  const [ cyclesState, dispatch ] = useReducer(cyclesReducer, 
    {
      cycles: [],
      activeCycleId: null
    }, (initialState) => {
      const storedStateAsJSON = localStorage.getItem('@ignite-stopwatch:cycles-state-1.0.0');

      if(storedStateAsJSON) {
        return JSON.parse(storedStateAsJSON);
      }

      return initialState
    });
    
    const { cycles, activeCycleId } = cyclesState;
    const activeCycle = cycles.find(( cycle ) => cycle.id === activeCycleId );

  const [ amountSecondsPassed, setAmountSecondsPassed ] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds( new Date(), new Date(activeCycle.startDate) );
    }

    return 0;
  });

    useEffect(() => {
      const stateJSON = JSON.stringify(cyclesState)
      localStorage.setItem('@ignite-stopwatch:cycles-state-1.0.0', stateJSON)
    }, [cyclesState])
  

  function setAmountSeconds(seconds: number) {
    setAmountSecondsPassed(seconds);
  }
    
  function markCurrentCycleAsFinished() {
    dispatch(
      markCurretCycleAsFinishedAction()
    )
  }

  function createNewCycle( data: CreateCycleData ) {
    const id = String( new Date().getTime() )

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date()
    }

    dispatch(
      addNewCycleAction(newCycle)
    )
    setAmountSecondsPassed( 0 );
  }
  
  function InterruptCurrentCycle() {
    dispatch(
      interruptedDateAction()
    )
  }

    return (
      <CyclesContext.Provider 
      value={{ 
        cycles,
        activeCycle, 
        activeCycleId, 
        markCurrentCycleAsFinished, 
        amountSecondsPassed, 
        setAmountSeconds,
        createNewCycle,
        InterruptCurrentCycle
      }}>
        {children}
      </CyclesContext.Provider>
    )
}