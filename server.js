import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";
import { PrismaClient } from '@prisma/client';
import { trackDevice } from './middlewares/deviceTracker.js';
import analyticsRoutes from './routes/analytics.js';
import authRoutes from "./routes/authRoutes.js";
import dataRoutes from "./routes/dataRoutes.js";
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const prisma = new PrismaClient();

// 🔒 MIDDLEWARES DE SEGURIDAD PARA PRODUCCIÓN
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

app.use(compression()); // Comprimir respuestas

// 🚦 RATE LIMITING
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // máximo 100 requests por IP
  message: {
    success: false,
    error: 'Demasiados intentos, por favor intenta más tarde'
  }
});

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000
});

// ✅ LOGGING MEJORADO
app.use((req, res, next) => {
  const start = Date.now();
  console.log(`📨 ${req.method} ${req.originalUrl} - IP: ${req.ip}`);
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`✅ ${req.method} ${req.originalUrl} - ${res.statusCode} - ${duration}ms`);
  });
  
  next();
});

// 🌐 CORS PARA PRODUCCIÓN MEJORADO
const allowedOrigins = [
  'https://antologa.com',
  'https://admins.antologa.com',
  'https://business.antologa.com',
  'https://www.antologa.com',
  'http://localhost:3000' // Para desarrollo
];

app.use(cors({
  origin: function (origin, callback) {
    // Permitir requests sin origin (como mobile apps o curl)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `El origen CORS ${origin} no está permitido`;
      console.log('❌ CORS bloqueado:', origin);
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Device-Id']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(trackDevice);

// 🛣️ RUTAS CON RATE LIMITING
app.use("/api/auth/", authLimiter, authRoutes);
app.use("/api/data/", apiLimiter, dataRoutes);
app.use("/api/analytics/", apiLimiter, analyticsRoutes);

// 🏥 HEALTH CHECK MEJORADO
app.get('/api/health', async (req, res) => {
  try {
    // Verificar conexión a la base de datos
    await prisma.$queryRaw`SELECT 1`;
    
    res.json({ 
      status: 'OK', 
      message: 'API Antologa funcionando correctamente',
      environment: process.env.NODE_ENV || 'development',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      database: 'connected'
    });
  } catch (error) {
    console.error('❌ Health check error:', error);
    res.status(503).json({
      status: 'ERROR',
      message: 'Problema de conexión con la base de datos',
      error: process.env.NODE_ENV === 'production' ? 'Internal error' : error.message
    });
  }
});

// 🗄️ TEST DE CONEXIÓN A BD MEJORADO
app.get('/api/db-test', async (req, res) => {
  try {
    const [users, businesses] = await Promise.all([
      prisma.customers.findMany(),
      prisma.business.findMany()
    ]);
    
    res.json({ 
      success: true, 
      stats: {
        users: users.length,
        businesses: businesses.length
      },
      message: 'Conexión a BD exitosa',
      database: 'healthy'
    });
  } catch (error) {
    console.error('❌ DB test error:', error);
    res.status(500).json({ 
      success: false, 
      error: process.env.NODE_ENV === 'production' ? 'Database error' : error.message
    });
  }
});

// 🏠 RUTA RAIZ
app.get('/', (req, res) => {
  res.json({
    message: 'Bienvenido a Antologa API',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    documentation: 'https://antologa.com/docs',
    health: '/api/health'
  });
});

// ❌ MANEJO DE RUTAS NO ENCONTRADAS
app.use((req, res) => {
  console.log('❌ Ruta no encontrada:', {
    path: req.originalUrl,
    method: req.method,
    ip: req.ip,
    timestamp: new Date().toISOString()
  });
  
  res.status(404).json({ 
    success: false,
    error: 'Ruta no encontrada',
    path: req.originalUrl,
    method: req.method
  });
});

// 🚨 MANEJO GLOBAL DE ERRORES
app.use((error, req, res, next) => {
  console.error('🚨 Error global:', {
    error: error.message,
    stack: process.env.NODE_ENV === 'production' ? 'Oculto' : error.stack,
    path: req.originalUrl,
    method: req.method,
    ip: req.ip,
    timestamp: new Date().toISOString()
  });

  res.status(error.status || 500).json({
    success: false,
    error: process.env.NODE_ENV === 'production' 
      ? 'Error interno del servidor' 
      : error.message
  });
});

export default app;