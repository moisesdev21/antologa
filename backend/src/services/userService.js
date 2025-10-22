const prisma = require("../config/prismaClient");
const bcrypt = require("bcryptjs");

// Registro de usuario
const registerUser = async (data) => {
  const { name, email, password, phoneNumber, userType } = data;

  // Verificar si ya existe el email
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new Error("El email ya está registrado");
  }

  // Encriptar contraseña
  const hashedPassword = await bcrypt.hash(password, 10);

  // Crear usuario
  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      phoneNumber,
      userType, // obligatorio en tu schema
    },
  });

  return newUser;
};

// Login de usuario
const loginUser = async (email, password) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("Usuario no encontrado");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Contraseña incorrecta");
  }

  return user;
};

module.exports = { registerUser, loginUser };
