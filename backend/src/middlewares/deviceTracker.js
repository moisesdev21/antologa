// middlewares/deviceTracker.js
import { PrismaClient } from "@prisma/client";
import fetch from 'node-fetch';

const prisma = new PrismaClient();

export const trackDevice = async (req, res, next) => {
  try {
    const userAgent = req.headers['user-agent'] || '';
    const ip = getClientIP(req);
    const acceptLanguage = req.headers['accept-language'] || '';

    // Parsear información del dispositivo
    const deviceInfo = parseUserAgent(userAgent);

    // Ignorar bots
    if (deviceInfo.isBot) {
      return next();
    }

    // Obtener geolocalización (solo en producción)
    let locationInfo = { country: 'Local', city: 'Development' };
    if (process.env.NODE_ENV === 'production') {
      locationInfo = await getLocationFromIP(ip);
    }

    // Guardar en la base de datos (async)
    saveDeviceLog({
      userId: req.user?.userId,
      ip,
      userAgent,
      deviceInfo,
      language: acceptLanguage.split(',')[0],
      locationInfo
    });

    req.deviceInfo = deviceInfo;
    next();
  } catch (error) {
    console.error('Error en device tracker:', error);
    next(); // No romper la app si falla el tracking
  }
};

// Obtener IP real
function getClientIP(req) {
  if (process.env.NODE_ENV === 'development') return '127.0.0.1';
  
  return req.headers['x-forwarded-for']?.split(',')[0] ||
         req.headers['x-real-ip'] ||
         req.connection.remoteAddress ||
         req.socket.remoteAddress ||
         'unknown';
}

// Parsear User-Agent
function parseUserAgent(userAgent) {
  const ua = userAgent.toLowerCase();

  let deviceType = 'desktop';
  let browser = 'unknown';
  let os = 'unknown';
  let isBot = false;

  // Detectar bots
  if (ua.includes('bot') || ua.includes('crawler') || ua.includes('spider')) {
    isBot = true;
    deviceType = 'bot';
  }

  // Detectar dispositivo
  if (!isBot) {
    if (ua.match(/mobile|android|iphone|ipod/)) deviceType = 'mobile';
    if (ua.match(/tablet|ipad/)) deviceType = 'tablet';
  }

  // Detectar navegador
  if (ua.includes('chrome')) browser = 'chrome';
  else if (ua.includes('firefox')) browser = 'firefox';
  else if (ua.includes('safari') && !ua.includes('chrome')) browser = 'safari';
  else if (ua.includes('edge')) browser = 'edge';
  else if (ua.includes('opera')) browser = 'opera';

  // Detectar SO
  if (ua.includes('windows')) os = 'windows';
  else if (ua.includes('macintosh')) os = 'macos';
  else if (ua.includes('linux')) os = 'linux';
  else if (ua.includes('android')) os = 'android';
  else if (ua.includes('iphone') || ua.includes('ipad')) os = 'ios';

  return { deviceType, browser, os, isBot };
}

// Geolocalización
async function getLocationFromIP(ip) {
  if (ip === '127.0.0.1' || ip === '::1' || ip === 'unknown') {
    return { country: 'Local', city: 'Development' };
  }

  try {
    const response = await fetch(`http://ipapi.co/${ip}/json/`);
    const data = await response.json();
    return {
      country: data.country_name || 'Unknown',
      city: data.city || 'Unknown',
      region: data.region || 'Unknown'
    };
  } catch (error) {
    console.log('Error en geolocalización:', error);
    return { country: 'Unknown', city: 'Unknown' };
  }
}

// Guardar log evitando duplicados diarios por IP + dispositivo
async function saveDeviceLog(data) {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existingLog = await prisma.deviceLogs.findFirst({
      where: {
        ip_address: data.ip,
        device_type: data.deviceInfo.deviceType,
        created_at: { gte: today },
        is_bot: false
      }
    });

    if (existingLog) return; // Ya registrado hoy, no duplicar

    await prisma.deviceLogs.create({
      data: {
        user_id: data.userId || null,
        ip_address: data.ip,
        user_agent: data.userAgent.substring(0, 500),
        device_type: data.deviceInfo.deviceType,
        browser: data.deviceInfo.browser,
        os: data.deviceInfo.os,
        is_bot: data.deviceInfo.isBot,
        country: data.locationInfo.country,
        city: data.locationInfo.city,
        language: data.language,
        environment: process.env.NODE_ENV || 'development',
        created_at: new Date()
      }
    });

  } catch (error) {
    console.error('Error guardando device log:', error);
  }
}
