import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const auth = localStorage.getItem("token");
  // Se o usuário não estiver autenticado, redireciona para a página de login
  if (!auth) {
    return <Navigate to="/" />;
  }

  // Caso o usuário esteja autenticado, renderiza a rota privada
  return <>{children}</>;
};

export default PrivateRoute;
