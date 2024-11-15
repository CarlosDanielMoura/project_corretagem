import { api } from "../../api";

const deleteClients = async (id: string) => {
  try {
    const result = await api.delete(`/client/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return result.data;
  } catch (error) {
    return "Erro ao deletar cliente";
  }
};

export { deleteClients };
