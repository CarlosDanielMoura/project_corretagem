import { NavLink, Route, Routes } from "react-router-dom";
import { DataSideBar } from "../../utils/dataSideBar";
import { Home } from "./pages/Home";
import { Cadastrar } from "./pages/Cadastrar";
import { Users } from "./pages/Users";
import useAuthStore from "../../context/authContext";
import { Toaster } from "../../components/ui/toaster";
import { toast } from "../../hooks/use-toast";
import { useEffect } from "react";

const Dashboard: React.FC = () => {
  const auth = useAuthStore((state) => state.auth);

  useEffect(() => {
    if (auth) {
      toast({
        title: `Bem-vindo!`,
        description: "Você está logado!",
      });
    }
  }, [auth]);

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <Toaster />

      {/* Menu lateral fixo */}
      <aside className="w-64 h-full bg-white border-r p-6 fixed">
        <div className="flex flex-col">
          <p className="text-login-primary text-base font-roboto font-medium">
            NOVO TEMPO CAFÉ
          </p>
          <a
            className="text-login-primary text-sm font-roboto font-medium"
            href="#"
          >
            Ver informações
          </a>
        </div>
        <ul className="flex flex-col gap-3 mt-8 ">
          {DataSideBar.map((item) => (
            <li key={item.title} className="flex items-center mb-4">
              <span className="text-xl">{item.icon}</span>
              <NavLink
                to={`/dashboard${item.path}`}
                className={({ isActive }) =>
                  `ml-3 ${
                    isActive ? "font-bold" : "font-normal"
                  } text-login-button_color`
                }
              >
                {item.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </aside>

      {/* Área de conteúdo rolável */}
      <main className="ml-64 flex-grow p-6 bg-gray-100 overflow-y-auto">
        <Routes>
          <Route path="homeDashboard" element={<Home />} />
          <Route path="cadastrar" element={<Cadastrar />} />
          <Route path="users" element={<Users />} />
        </Routes>
      </main>
    </div>
  );
};

export { Dashboard };
