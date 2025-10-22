import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());

// Users
app.get('/api/users', async (req, res) => {
  const users = await prisma.user.findMany({
    include: {
      businesses: true,
      payments: true,
      itineraries: true,
      reviews: true,
      articles: true,
    },
  });
  res.json(users);
});
// POST /api/users - Registrar un usuario
app.post('/api/users', async (req, res) => {
  const { name, email, password, phone_number, user_type } = req.body;

  try {
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password,
        phoneNumber: phone_number, // 👈 respeta el @map
        userType: user_type,       // 👈 usa userType (camelCase en Prisma)
      },
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error al registrar usuario ❌:", error);
    res.status(500).json({ message: error.message });
  }
});

// Login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // ⚠️ En producción deberías usar bcrypt para comparar contraseñas
    if (user.password !== password) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    // Devolvemos el usuario (sin la contraseña por seguridad)
    const { password: _, ...userWithoutPassword } = user;

    res.json({
      message: 'Login exitoso ✅',
      user: userWithoutPassword,
    });

  } catch (error) {
    console.error("Error en login ❌:", error);
    res.status(500).json({ message: error.message });
  }
});





// Businesses
app.get('/api/businesses', async (req, res) => {
  const businesses = await prisma.business.findMany({
    include: {
      user: true,
      destinations: true,
      experiences: true,
      itineraries: true,
      reviews: true,
    },
  });
  res.json(businesses);
});

// Categories
app.get('/api/categories', async (req, res) => {
  const categories = await prisma.category.findMany({
    include: {
      destinations: true,
      experiences: true,
    },
  });
  res.json(categories);
});

// Locations
app.get('/api/locations', async (req, res) => {
  const locations = await prisma.location.findMany({
    include: {
      destinations: true,
      experiences: true,
      images: true,
    },
  });
  res.json(locations);
});

// Destinations
app.get('/api/destinations', async (req, res) => {
  const destinations = await prisma.destination.findMany({
    include: {
      locationRel: true,
      business: true,
      category: true,
      itineraries: true,
      reviews: true,
      images: true,
    },
  });
  res.json(destinations);
});

// Experiences
app.get('/api/experiences', async (req, res) => {
  const experiences = await prisma.experience.findMany({
    include: {
      business: true,
      category: true,
      locationRel: true,
      itineraries: true,
      reviews: true,
      images: true,
    },
  });
  res.json(experiences);
});

// Payments
app.get('/api/payments', async (req, res) => {
  const payments = await prisma.payment.findMany({
    include: {
      user: true,
      itineraries: true,
    },
  });
  res.json(payments);
});

// Itinerary
app.get('/api/itinerary', async (req, res) => {
  const itinerary = await prisma.itinerary.findMany({
    include: {
      user: true,
      destination: true,
      experience: true,
      business: true,
      payment: true,
    },
  });
  res.json(itinerary);
});

// Reviews
app.get('/api/reviews', async (req, res) => {
  const reviews = await prisma.review.findMany({
    include: {
      user: true,
      destination: true,
      experience: true,
      business: true,
    },
  });
  res.json(reviews);
});

// Articles
app.get('/api/articles', async (req, res) => {
  const articles = await prisma.article.findMany({
    include: {
      author: true,
    },
  });
  res.json(articles);
});

// Images
app.get('/api/images', async (req, res) => {
  const images = await prisma.image.findMany({
    include: {
      location: true,
      destination: true,
      experience: true,
    },
  });
  res.json(images);
});

// Servidor
app.listen(4000, () => {
  console.log('Servidor corriendo en http://localhost:4000');
});
