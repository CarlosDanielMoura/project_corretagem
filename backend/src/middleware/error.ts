import { Request, Response, NextFunction } from "express";
import { ApiError } from "../helpers/error-api";

export function errorMiddleware(
  err: Error & Partial<ApiError>,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err);

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  // Erro genérico
  return res.status(500).json({ message: "Internal server error" });
}
