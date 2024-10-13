// src/types/express/index.d.ts

export {}; // Certifica que o arquivo seja tratado como um módulo do TypeScript

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        email: string;
      };
    }
  }
}
