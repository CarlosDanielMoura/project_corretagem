import { Client, PrismaClient } from "@prisma/client";
import { BadRequestError, NotFoundError } from "../helpers/error-api";

const prisma = new PrismaClient();

class ClientService {
  async createClient(data: Omit<Client, "id" | "createdAt" | "updatedAt">) {
    const { ie } = data;

    const existingIE = ie
      ? await prisma.client.findFirst({
          where: { ie },
        })
      : null;

    if (existingIE) {
      throw new BadRequestError("IE already exists");
    }

    const newClient = await prisma.client.create({
      data,
      select: {
        id: false,
        ie: true,
        name: true,
        cep: true,
        city: true,
        cpfCnpj: true,
        road: true,
        number: true,
        car: true,
      },
    });

    return newClient;
  }

  async getClients(id?: string) {
    if (id) {
      const client = await this.findClientById(id);
      if (!client) {
        throw new NotFoundError("Client not found");
      }
      return client;
    }

    const clients = await prisma.client.findMany();
    if (clients.length >= 0) {
      return clients;
    }
  }
  async deleteClient(id: string) {
    if (!id) {
      throw new BadRequestError("ID is required");
    }
    const client = await prisma.client.findFirst({
      where: { id },
    });

    if (!client) {
      throw new NotFoundError("Client not found");
    }

    await prisma.client.delete({
      where: { id },
    });

    return true;
  }

  async updateClient(
    id: string,
    data: Omit<Client, "id" | "createdAt" | "updatedAt">
  ) {
    if (!id) {
      throw new BadRequestError("ID is required");
    }

    const client = await this.findClientById(id);

    if (!client) {
      throw new NotFoundError("Client not found");
    }

    const updatedClient = await prisma.client.update({
      where: { id },
      data,
      select: {
        id: false,
        ie: true,
        name: true,
        cep: true,
        city: true,
        cpfCnpj: true,
        road: true,
        number: true,
        car: true,
      },
    });

    return updatedClient;
  }

  private async findClientById(id: string) {
    const client = await prisma.client.findFirst({
      where: { id },
    });

    if (!client) {
      throw new NotFoundError("Client not found");
    }

    return client;
  }
}
export default ClientService;
