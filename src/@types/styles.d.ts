// Este arquivo é de definição de tipos, ou seja, dentro deste arquivo só poderá houver interface/types.

import 'styled-components'
import { DefaultTheme } from '../styles/themes/default'

type ThemeType = typeof DefaultTheme

declare module 'styled-components' {
  // Criando uma tipagem para o styled components
  export interface DefaultTheme extends ThemeType {}
}
