import { ThemeProvider } from 'styled-components'
import { DefaultTheme } from './styles/themes/default'
import { GlobalStyle } from './styles/global'
import { Router } from './Router'
import { BrowserRouter } from 'react-router-dom'
import { CyclesContextProvider } from './contexts/CyclesContext'

export function App() {
  return (
    <ThemeProvider theme={DefaultTheme}>
      <BrowserRouter> {/* Aqui devemos sempre englobar toda a aplicação dentro do BrowserRouter, para que de certos as rotas.*/}
        <CyclesContextProvider>
          <Router /> {/* E aqui passamos o Router, para identificar que isso tem rotas a serem seguidas. E nao dar erro na aplicação.*/}
        </CyclesContextProvider>
      </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider>
  )
}
