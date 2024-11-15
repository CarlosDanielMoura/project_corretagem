import { Request, Response } from "express";
import ClientService from "../services/Client.service";
import { BadRequestError, NotFoundError } from "../helpers/error-api";

const clientService = new ClientService();

export class ClientController {
  async create(req: Request, res: Response): Promise<void> {
    if (!req.body.ie) {
      res.status(400).json({ message: "IE is required" });
    }
    try {
      const client = await clientService.createClient(req.body);
      res.status(201).json({ message: "Client created successfully", client });
    } catch (error) {
      if (error instanceof BadRequestError) {
        res.status(400).json({ message: error.message });
        return;
      }
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async get(req: Request, res: Response): Promise<void> {
    try {
      const clients = await clientService.getClients(req.params.id);
      res.status(200).json({ message: "Clients found success", data: clients });
    } catch (error) {
      if (error instanceof NotFoundError) {
        res.status(400).json({ message: error.message });
        return;
      }
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      await clientService.deleteClient(req.params.id);
      res.status(200).json({ message: "Client deleted successfully" });
    } catch (error) {
      if (error instanceof NotFoundError) {
        res.status(400).json({ message: error.message });
        return;
      }
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      await clientService.updateClient(req.params.id, req.body);
      res.status(200).json({ message: "Client updated successfully" });
    } catch (error) {
      if (error instanceof NotFoundError || error instanceof BadRequestError) {
        res.json({ message: error.message });
        return;
      }
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
