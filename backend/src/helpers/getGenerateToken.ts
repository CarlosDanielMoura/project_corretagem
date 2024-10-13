import { User } from "@prisma/client";
import jwt from "jsonwebtoken";
import "dotenv/config";

const getGenerateToken = (user: User) => {
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_PASS ?? "",
    {
      expiresIn: "1d",
    }
  );
};

export { getGenerateToken };
