import { api } from "../../api";

interface Client {
  id?: string;
  name: string;
  cpfCnpj: string;
  ie: string;
  cep: string;
  road: string;
  number: string;
  city: string;
  car: string;
}

const AddClient = async (client: Client) => {
  try {
    const result = await api.post("/client/create", client, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return result.data;
  } catch (error) {
    return "Erro ao adicionar cliente";
  }
};

export { AddClient };
