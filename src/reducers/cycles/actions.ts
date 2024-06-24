import { Cycle } from "./reducer";

export enum ActionTypes {
  AddNewCycle = 'AddNewCycle',
  InterruptedCurrentCycle = 'InterruptedCurrentCycle',
  MarkCurretCycleAsFinished = 'MarkCurretCycleAsFinished',
}

export function addNewCycleAction(newCycle: Cycle) {
  return {
    type: ActionTypes.AddNewCycle, // O nome da ação que eu quero realizar.
    payload: {
      newCycle // Os dados 
    }
  }
}

export function markCurretCycleAsFinishedAction() {
  return {
    type: ActionTypes.MarkCurretCycleAsFinished, // O nome da ação que eu quero realizar.
  }
}

export function interruptedDateAction() {
  return {
    type: ActionTypes.InterruptedCurrentCycle, // O nome da ação que eu quero realizar.
  }
}