import { CirclePlus, Home, Users } from "lucide-react";

const DataSideBar = [
  {
    title: "Home",
    path: "/homeDashboard",
    icon: <Home color="#36251C" />,
  },
  {
    title: "Cadastrar",
    path: "/cadastrar",
    icon: <CirclePlus color="#36251C" />,
  },
  {
    title: "Usuários",
    path: "/users",
    icon: <Users color="#36251C" />,
  },
];

export { DataSideBar };
