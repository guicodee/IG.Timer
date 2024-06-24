import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header";
import { LayoutContainer } from "./styles";

export function DefaultLayout() {

  return (
    <LayoutContainer>
      <Header />
      <Outlet /> {/* Serve para que quando estivermos em uma rota aparecer um conteudo, e quando tiver em outra rota aparecer outro conteudo.*/}
    </LayoutContainer>
  )
}