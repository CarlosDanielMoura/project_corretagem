import { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { toast } from "../hooks/use-toast";
import { AddClient } from "../utils/clients/addClient";
import InputMask from "react-input-mask"; // Importa a biblioteca de máscara

const ModalCustomAddClient = ({ onDelete }: { onDelete: () => void }) => {
  const [newClient, setNewClient] = useState({
    name: "",
    cpfCnpj: "",
    ie: "",
    cep: "",
    road: "",
    number: "",
    city: "",
    car: "",
  });

  // Função para atualizar o estado dos campos
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewClient((prevClient) => ({
      ...prevClient,
      [name]: value,
    }));
  };

  // Função para salvar o cliente
  const handleSave = async () => {
    try {
      const result = await AddClient(newClient);
      toast({
        variant: "success",
        title: `✅ ${result.message}`,
      });
      setNewClient({
        name: "",
        cpfCnpj: "",
        ie: "",
        cep: "",
        road: "",
        number: "",
        city: "",
        car: "",
      });
      onDelete();
    } catch (error) {
      toast({ title: "Erro ao adicionar cliente", variant: "destructive" });
      console.error("Erro ao adicionar cliente:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-login-primary">Incluir</Button>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle className="text-lg font-inter font-semibold">
            Cadastrar Cliente
          </DialogTitle>
        </DialogHeader>
        <div className="grid grid-row-3 gap-3">
          <input
            className="w-full outline-none border-login-primary mt-1 p-2 bg-gray-100 rounded"
            placeholder="Nome"
            name="name"
            value={newClient.name}
            onChange={handleChange}
          />
          <InputMask
            mask="999.999.999-99" // Máscara para CPF, você pode usar 99.999.999/9999-99 para CNPJ
            className="w-full outline-none border-login-primary mt-1 p-2 bg-gray-100 rounded"
            placeholder="CPF/CNPJ"
            name="cpfCnpj"
            value={newClient.cpfCnpj}
            onChange={handleChange}
          />
          <input
            className="w-full outline-none border-login-primary mt-1 p-2 bg-gray-100 rounded"
            placeholder="Inscrição Estadual"
            name="ie"
            value={newClient.ie}
            onChange={handleChange}
          />
          <div className="grid grid-cols-2 gap-3">
            <InputMask
              mask="99999-999" // Máscara para CEP
              className="w-full outline-none border-login-primary mt-1 p-2 bg-gray-100 rounded"
              placeholder="CEP"
              name="cep"
              value={newClient.cep}
              onChange={handleChange}
            />
            <input
              className="w-full outline-none border-login-primary mt-1 p-2 bg-gray-100 rounded"
              placeholder="Cidade"
              name="city"
              value={newClient.city}
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <input
              className="w-full outline-none border-login-primary mt-1 p-2 bg-gray-100 rounded"
              placeholder="Bairro"
              name="road"
              value={newClient.road}
              onChange={handleChange}
            />
            <input
              className="w-full outline-none border-login-primary mt-1 p-2 bg-gray-100 rounded"
              placeholder="Número"
              name="number"
              value={newClient.number}
              onChange={handleChange}
            />
          </div>
          <input
            className="w-full outline-none border-login-primary mt-1 p-2 bg-gray-100 rounded"
            placeholder="CAR - Certificado Ambiental Rural"
            name="car"
            value={newClient.car}
            onChange={handleChange}
          />
        </div>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" className="bg-red-500">
              Fechar
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              type="button"
              className="bg-login-primary"
              onClick={handleSave}
            >
              Salvar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export { ModalCustomAddClient };
