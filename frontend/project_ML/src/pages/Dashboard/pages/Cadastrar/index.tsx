import { TableCustom } from "../../../../components/table";

const Cadastrar: React.FC = () => {
  return (
    <div className="w-full h-full">
      <h1 className="font-roboto text-4xl text-login-primary font-normal">
        Clientes
      </h1>
      <div className="w-full h-full">
        <TableCustom />
      </div>
    </div>
  );
};
export { Cadastrar };
