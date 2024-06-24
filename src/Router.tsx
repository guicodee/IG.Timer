import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home';
import { History } from './pages/History';
import { DefaultLayout } from './layouts/DefaultLayout';

export function Router() {
  return (
    <Routes>
        <Route path='/' element={<DefaultLayout />} >
            <Route path='/' element={ <Home /> } /> // Para paginas que vão ser a primeira quando entrar na pagina, ou seja nao é preciso colocar o diretorio, somente no element
            <Route path='/history' element={ <History /> } /> // Aqui sim devemos colocar o diretorio, pois o usuario será redirecionado para esta pagina.
        </Route>
    </Routes>
  );
}
