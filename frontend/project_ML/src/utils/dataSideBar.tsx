import { CirclePlus, Home, Users } from "lucide-react";

const DataSideBar = [
  {
    title: "Home",
    path: "/homeDashboard",
    icon: <Home />,
  },
  {
    title: "Cadastrar",
    path: "/cadastrar",
    icon: <CirclePlus />,
  },
  {
    title: "Usuários",
    path: "/users",
    icon: <Users />,
  },
];

export { DataSideBar };
