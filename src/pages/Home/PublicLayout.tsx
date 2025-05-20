import { Outlet } from "react-router";
import NavBar from "./NavBar";



export default function PublicLayout() {
  return (
    <div>
      <NavBar /> {/* Barra de navegación común para páginas no autenticadas */}
      <Outlet /> {/* Aquí se renderizarán las páginas hijas */}
    </div>
  );
}
