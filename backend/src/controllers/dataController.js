// backend/src/controllers/dataController.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Obtener todas las locations
export const getLocations = async (req, res) => {
  try {
    const locations = await prisma.location.findMany({
      include: {
        destinations: true,
        experiences: true,
        images: true,
      },
    });
    res.json(locations);
  } catch (error) {
    console.error("Error al obtener locations ❌:", error);
    res.status(500).json({ message: error.message });
  }
};

// Obtener todas las images
export const getImages = async (req, res) => {
  try {
    const images = await prisma.image.findMany({
      include: {
        location: true,
        destination: true,
        experience: true,
      },
    });
    res.json(images);
  } catch (error) {
    console.error("Error al obtener images ❌:", error);
    res.status(500).json({ message: error.message });
  }
};
