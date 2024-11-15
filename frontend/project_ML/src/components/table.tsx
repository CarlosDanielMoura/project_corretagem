import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

import { Input } from "./ui/input";
import { columnsClients } from "../utils/dataClient";
import ClientActions from "./ClientActions";
import { ModalCustomAddClient } from "./ModalClientAdd";
import { useEffect, useRef, useState } from "react";
import { api } from "../api";

const TableCustom = () => {
  const [allClients, setAllClients] = useState<any[]>([]);
  const [clients, setClients] = useState<any[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (search: string) => {
    if (search) {
      const filteredClients = allClients.filter((client) =>
        client.name.toLowerCase().includes(search.toLowerCase())
      );
      setClients(filteredClients);
    } else {
      setClients(allClients);
    }
  };

  const fetchClients = async () => {
    try {
      const result = await api.get("/client/get/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setAllClients(result.data.data);
      setClients(result.data.data);
      console.log("Clientes encontrados:", result.data.data);

      if (clients.length === 0) {
        console.log("Nenhum cliente encontrado.");
      }
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return (
    <div className="w-full h-full mt-6">
      <div className="flex justify-between items-center mb-4">
        <ModalCustomAddClient onDelete={fetchClients}/>
        <Input
          type="text"
          placeholder="Pesquisar cliente"
          className="w-1/3 border-login-primary"
          ref={inputRef}
          onChange={() => {
            handleSearch(inputRef.current?.value || "");
          }}
        />
      </div>

      <Table>
        <TableCaption>Informações dos Clientes</TableCaption>
        <TableHeader>
          <TableRow>
            {columnsClients.map((column) => (
              <TableHead key={column.accessor}>{column.Header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.length > 0 ? (
            clients.map((client: any, index: number) => (
              <TableRow key={index}>
                <TableCell>{client.name}</TableCell>
                <TableCell>{client.cpfCnpj}</TableCell>
                <TableCell>{client.ie}</TableCell>
                <TableCell>{client.cep}</TableCell>
                <TableCell>{client.city}</TableCell>
                <TableCell>{client.car}</TableCell>
                <TableCell>
                  <ClientActions client={client} onDelete={fetchClients} />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columnsClients.length}>
                Nenhum cliente encontrado.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export { TableCustom };
