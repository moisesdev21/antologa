import prisma from "../config/prismaClient.js";
import bcrypt from "bcryptjs";

export const getUsers = async () => {
  return prisma.user.findMany();
};

export const createUser = async (email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return prisma.user.create({
    data: { email, password: hashedPassword },
  });
};
