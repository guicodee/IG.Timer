import { HandPalm, Play } from "phosphor-react";
import { 
  HomeContainer, 
  StartCountDownButton, 
  StopCountDownButton, 
} from "./styles";
import { useContext } from "react";
import NewCycleForm from "./components/NewCycleForm";
import Countdown from "./components/Countdown";
import * as zod from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { CyclesContext } from "../../contexts/CyclesContext";

type NewCycleFormData = zod.infer<typeof newCycleFormatValidationSchema>

const newCycleFormatValidationSchema = zod.object({
  task: zod.string().min( 1, 'Informe um nome para a tarefa.' ),
  minutesAmount: 
    zod.number()
    .min( 5, 'O valor inicial tem que ser igual ou maior do que 5 minutos.' )
    .max( 60, 'O valor máximo tem que ser igual ou menor do que 60 minutos.' )
}); 

export function Home() {
  const { activeCycle, createNewCycle, InterruptCurrentCycle } = useContext(CyclesContext);

  const newCycleForm = useForm({
    resolver: zodResolver(newCycleFormatValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    }
  }); 
  
  const { handleSubmit, watch, reset  } = newCycleForm;
  
  function handleCreateNewCycle(data: NewCycleFormData) {
    createNewCycle(data);
    reset();
  }
  
  const task = watch('task');
  const isSubmitDisable = !task;

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit( handleCreateNewCycle )} action="">
        
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />

      { activeCycle ? ( // Se tiver um clico ativo, aparece isso, se nao estiver, aparece isso.
        <StopCountDownButton onClick={ InterruptCurrentCycle } type="button">
          <HandPalm size={24}/>
            Interromper 
        </StopCountDownButton>
      ) : (
        <StartCountDownButton disabled={ isSubmitDisable } type="submit">
          <Play size={24}/>
          Começar
        </StartCountDownButton>
      )}

      </form>
    </HomeContainer>
  )
}
