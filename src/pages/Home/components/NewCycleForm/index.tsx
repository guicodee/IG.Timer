import { FormContainer, MinutosAmountInput, TaskInput } from "./styles";
import { useContext } from "react";

import { useFormContext } from "react-hook-form";
import { CyclesContext } from "../../../../contexts/CyclesContext";

export default function NewCycleForm() {
  const { activeCycle } = useContext(CyclesContext);

  const { register } = useFormContext()
  
    return (
      <FormContainer>
        <label htmlFor="task">Vou trabalhar em</label>
        <TaskInput 
          id="task"
          list="taskSuggestions"
          placeholder="Dê um nome para o seu projeto."
          disabled={!!activeCycle}
          {...register( 'task' )}
        />

        <datalist id="taskSuggestions">
          <option value="Projeto1" />
          <option value="Projeto2" />
          <option value="Projeto3" />
          <option value="Olá" />
        </datalist>

        <label htmlFor="">durante</label>
        <MinutosAmountInput 
          type="number" 
          id="minutesAmount"
          placeholder="00"
          step={5} // Pula o numero de 5 em 5 minutos.
          min={5}
          max={60}
          disabled={ !!activeCycle }
          {...register( 'minutesAmount', { valueAsNumber: true} )}
        />

        <span>minutos.</span>
      </FormContainer>
    )
}

