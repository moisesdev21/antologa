import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const JWT_SECRET = "tu_clave_secreta_super_segura_aqui"; // usa variable de entorno en producción

/**
 * Función de Registro
 * Ahora crea en la tabla correspondiente según el userType
 */
export const register = async (req, res) => {
  const { name, lastName, nametag, email, password, phoneNumber, userType } = req.body;

  try {
    // Limpiar y normalizar entradas
    const cleanName = (name || "").trim();
    const cleanLastName = (lastName || "").trim();
    const cleanNametag = (nametag || "").trim();
    const cleanEmail = (email || "").trim().toLowerCase();
    const cleanPassword = (password || "").trim();
    const cleanPhone = (phoneNumber || "").trim();
    const cleanUserType = (userType || "customer").trim();

    // Verificar si email o nametag ya existen en cualquier tabla de usuarios
    const [existingCustomer, existingBusinessUser, existingAdmin] = await Promise.all([
      prisma.customers.findFirst({
        where: {
          OR: [{ email: cleanEmail }, { nametag: cleanNametag }],
        },
      }),
      prisma.businessUsers.findFirst({
        where: {
          OR: [{ email: cleanEmail }, { nametag: cleanNametag }],
        },
      }),
      prisma.admins.findFirst({
        where: {
          OR: [{ email: cleanEmail }, { nametag: cleanNametag }],
        },
      })
    ]);

    const existingUser = existingCustomer || existingBusinessUser || existingAdmin;

    if (existingUser) {
      if (existingUser.email === cleanEmail) return res.status(409).json({ message: "El correo electrónico ya está registrado." });
      if (existingUser.nametag === cleanNametag) return res.status(409).json({ message: "El nametag/nombre de usuario ya está en uso." });
    }

    let newUser;

    // Crear usuario en la tabla correspondiente
    switch (cleanUserType) {
      case "customer":
        newUser = await prisma.customers.create({
          data: {
            name: cleanName,
            last_name: cleanLastName,
            nametag: cleanNametag,
            email: cleanEmail,
            password: cleanPassword, // texto plano (solo para pruebas)
            phone_number: cleanPhone,
          },
          select: {
            customer_id: true,
            name: true,
            last_name: true,
            nametag: true,
            email: true,
            phone_number: true,
            created_at: true,
          },
        });
        break;

      case "business":
        newUser = await prisma.businessUsers.create({
          data: {
            name: cleanName,
            last_name: cleanLastName,
            nametag: cleanNametag,
            email: cleanEmail,
            password: cleanPassword,
            phone_number: cleanPhone,
          },
          select: {
            business_user_id: true,
            name: true,
            last_name: true,
            nametag: true,
            email: true,
            phone_number: true,
            created_at: true,
          },
        });
        break;

      case "admin":
        // Solo permitir crear admins si hay una lógica de autorización adicional
        newUser = await prisma.admins.create({
          data: {
            name: cleanName,
            last_name: cleanLastName,
            nametag: cleanNametag,
            email: cleanEmail,
            password: cleanPassword,
            phone_number: cleanPhone,
          },
          select: {
            admin_id: true,
            name: true,
            last_name: true,
            nametag: true,
            email: true,
            phone_number: true,
            created_at: true,
          },
        });
        break;

      default:
        return res.status(400).json({ message: "Tipo de usuario no válido." });
    }

    // Formatear respuesta para mantener compatibilidad
    const formattedUser = {
      id: newUser.customer_id || newUser.business_user_id || newUser.admin_id,
      name: newUser.name,
      lastName: newUser.last_name,
      nametag: newUser.nametag,
      email: newUser.email,
      phoneNumber: newUser.phone_number,
      userType: cleanUserType,
      createdAt: newUser.created_at,
    };

    res.status(201).json(formattedUser);
  } catch (error) {
    console.error("Error al registrar usuario ❌:", error);
    res.status(500).json({ message: "Error interno del servidor al registrar. Revise los logs." });
  }
};

/**
 * Función de Login
 * Busca en todas las tablas de usuarios por nametag o email
 */
export const login = async (req, res) => {
  const { identifier, password, userType } = req.body;

  try {
    const idTrim = (identifier || "").trim();
    const passTrim = (password || "").trim();
    const typeTrim = (userType || "").trim();

    // Buscar usuario en todas las tablas
    const [customer, businessUser, admin] = await Promise.all([
      prisma.customers.findFirst({
        where: {
          OR: [{ email: idTrim }, { nametag: idTrim }],
        },
      }),
      prisma.businessUsers.findFirst({
        where: {
          OR: [{ email: idTrim }, { nametag: idTrim }],
        },
      }),
      prisma.admins.findFirst({
        where: {
          OR: [{ email: idTrim }, { nametag: idTrim }],
        },
      })
    ]);

    // Determinar qué usuario fue encontrado
    let user = null;
    let userTable = null;

    if (customer) {
      user = customer;
      userTable = 'customer';
    } else if (businessUser) {
      user = businessUser;
      userTable = 'business';
    } else if (admin) {
      user = admin;
      userTable = 'admin';
    }

    if (!user) {
      console.log("⚠️ Usuario no encontrado:", idTrim);
      return res.status(404).json({ message: "Usuario o nametag no encontrado." });
    }

    // Validación opcional por tipo de usuario
    if (typeTrim && userTable !== typeTrim) {
      console.log(`⚠️ Usuario encontrado en tabla '${userTable}', pero se esperaba '${typeTrim}'`);
      return res.status(401).json({ message: "Tipo de usuario incorrecto para este acceso." });
    }

    // Comparar contraseña
    const storedPass = (user.password || "").trim();
    if (passTrim !== storedPass) {
      console.log("⚠️ Contraseña incorrecta para:", user.email || user.nametag);
      return res.status(401).json({ message: "Contraseña incorrecta." });
    }

    // Generar token JWT
    const token = jwt.sign(
      { 
        userId: user.customer_id || user.business_user_id || user.admin_id, 
        userType: userTable 
      },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Preparar respuesta sin password
    const { password: _, ...userWithoutPassword } = user;
    
    const formattedUser = {
      id: user.customer_id || user.business_user_id || user.admin_id,
      name: user.name,
      lastName: user.last_name,
      nametag: user.nametag,
      email: user.email,
      phoneNumber: user.phone_number,
      userType: userTable,
      createdAt: user.created_at,
    };

    res.json({
      message: "Login exitoso ✅",
      token,
      user: formattedUser,
    });

  } catch (error) {
    console.error("Error en login ❌:", error);
    res.status(500).json({ message: "Error interno del servidor al intentar iniciar sesión." });
  }
};