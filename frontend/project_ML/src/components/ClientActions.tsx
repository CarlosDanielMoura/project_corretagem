import { ReactNode, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Pencil, Eye, Trash2 } from "lucide-react";
import { deleteClients } from "../utils/clients/deleteClients";
import { toast } from "../hooks/use-toast";
import { Input } from "./ui/input";
import { updateClient } from "../utils/clients/updateClient";

interface Client {
  id: string;
  name: string;
  cpfCnpj: string;
  ie: string;
  cep: string;
  road: string;
  number: string;
  city: string;
  car: string;
  actions: ReactNode;
}

const ClientActions = ({
  client,
  onDelete,
}: {
  client: Client;
  onDelete: () => void;
}) => {
  const [editedClient, setEditedClient] = useState<Client>({ ...client });

  // Função para atualizar o estado ao alterar qualquer campo
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedClient((prevClient) => ({
      ...prevClient,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      const result = await updateClient(editedClient);
      toast({
        variant: "success",
        title: `✅ ${result.message}, `,
      });
      onDelete();
    } catch (error) {
      console.error("Erro ao atualizar cliente:", error);
      toast({
        variant: "error",
        title: "Erro ao atualizar cliente",
      });
    }
  };

  const handleClickDelete = async () => {
    try {
      const result = await deleteClients(client.id);
      toast({
        variant: "destructive",
        title: result.message,
      });
      onDelete(); // Chama onDelete apenas se a exclusão for bem-sucedida
    } catch (error) {
      console.error("Erro ao excluir cliente:", error);
      toast({
        variant: "destructive",
        title: "Erro ao excluir cliente",
      });
    }
  };

  return (
    <div className="flex gap-1">
      {/* Botão para abrir o diálogo de visualização */}
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost">
            <Eye size={18} />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Visualizar Cliente</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            <p className="text-gray-700">
              <strong className="font-medium">Nome:</strong> {client.name}
            </p>
            <p className="text-gray-700">
              <strong className="font-medium">CPF/CNPJ:</strong>{" "}
              {client.cpfCnpj}
            </p>
            <p className="text-gray-700">
              <strong className="font-medium">Inscrição Estadual:</strong>{" "}
              {client.ie}
            </p>
            <p className="text-gray-700">
              <strong className="font-medium">CEP:</strong> {client.cep}
            </p>
            <p className="text-gray-700">
              <strong className="font-medium">Endereço:</strong> {client.road},{" "}
              {client.number}
            </p>
            <p className="text-gray-700">
              <strong className="font-medium">Cidade:</strong> {client.city}
            </p>
            <p className="text-gray-700">
              <strong className="font-medium">CAR:</strong> {client.car}
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Botão para abrir o diálogo de edição */}
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost">
            <Pencil size={18} />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Cliente</DialogTitle>
            <DialogDescription>
              Faça as alterações necessárias nas informações do cliente.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nome
              </label>
              <Input
                className="w-full border-login-primary mt-1"
                placeholder="Nome"
                name="name"
                value={editedClient.name}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                CPF/CNPJ
              </label>
              <Input
                className="w-full border-login-primary mt-1"
                placeholder="CPF/CNPJ"
                name="cpfCnpj"
                value={editedClient.cpfCnpj}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Inscrição Estadual
              </label>
              <Input
                className="w-full border-login-primary mt-1"
                placeholder="Inscrição Estadual"
                name="ie"
                value={editedClient.ie}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  CEP
                </label>
                <Input
                  className="w-full border-login-primary mt-1"
                  placeholder="CEP"
                  name="cep"
                  value={editedClient.cep}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Cidade
                </label>
                <Input
                  className="w-full border-login-primary mt-1"
                  placeholder="Cidade"
                  name="city"
                  value={editedClient.city}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Bairro
                </label>
                <Input
                  className="w-full border-login-primary mt-1"
                  placeholder="Bairro"
                  name="road"
                  value={editedClient.road}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Número
                </label>
                <Input
                  className="w-full border-login-primary mt-1"
                  placeholder="Número"
                  name="number"
                  value={editedClient.number}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                CAR - Certificado Ambiental Rural
              </label>
              <Input
                className="w-full border-login-primary mt-1"
                placeholder="CAR - Certificado Ambiental Rural"
                name="car"
                value={editedClient.car}
                onChange={handleChange}
              />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button className="bg-blue-500" onClick={handleSaveChanges}>
                Salvar Alterações
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Botão para abrir o diálogo de confirmação de exclusão */}
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost">
            <Trash2 size={18} color="red" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmação de Exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza de que deseja excluir este cliente:{" "}
              <strong> {client.name}</strong>
              <br />
              Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Fechar
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button onClick={handleClickDelete} variant="destructive">
                Confirmar Exclusão
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ClientActions;
