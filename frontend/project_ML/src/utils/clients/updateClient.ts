import { api } from "../../api";

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
}

const updateClient = async (client: Client) => {
  try {
    const result = await api.patch(`/client/update/${client.id}`, client, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return result.data;
  } catch (error) {
    return error;
  }
};
export { updateClient };
