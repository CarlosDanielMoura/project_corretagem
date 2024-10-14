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
    <div className="flex h-screen">
      <Toaster />
      <div className="w-64 bg-gray-800 text-white p-6">
        <ul>
          {DataSideBar.map((item) => (
            <li key={item.title} className="flex items-center mb-4">
              <span className="text-xl">{item.icon}</span>
              <NavLink
                to={`/dashboard${item.path}`} // Certifique-se que o caminho comece com /dashboard
                className={({ isActive }) =>
                  `ml-3 ${isActive ? "font-bold" : "font-normal"}`
                }
              >
                {item.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-grow p-6 bg-gray-100">
        <Routes>
          <Route path="homeDashboard" element={<Home />} />
          <Route path="cadastrar" element={<Cadastrar />} />
          <Route path="users" element={<Users />} />
        </Routes>
      </div>
    </div>
  );
};

export { Dashboard };
