// routes/analytics.js
import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();

// Dashboard de analytics
router.get('/dashboard', async (req, res) => {
  try {
    const [
      totalVisits,
      devicesByType,
      browsers,
      operatingSystems,
      countries,
      recentActivity
    ] = await Promise.all([
      // Total de visitas
      prisma.deviceLogs.count({
        where: { is_bot: false }
      }),
      
      // Dispositivos por tipo
      prisma.deviceLogs.groupBy({
        by: ['device_type'],
        where: { is_bot: false },
        _count: { device_log_id: true }
      }),
      
      // Navegadores
      prisma.deviceLogs.groupBy({
        by: ['browser'],
        where: { is_bot: false },
        _count: { device_log_id: true }
      }),
      
      // Sistemas operativos
      prisma.deviceLogs.groupBy({
        by: ['os'],
        where: { is_bot: false },
        _count: { device_log_id: true }
      }),
      
      // Países (solo en producción)
      prisma.deviceLogs.groupBy({
        by: ['country'],
        where: { 
          is_bot: false,
          NOT: { country: 'Local' }
        },
        _count: { device_log_id: true }
      }),
      
      // Actividad reciente
      prisma.deviceLogs.findMany({
        where: { is_bot: false },
        include: {
          customer: {
            select: { name: true, email: true }
          }
        },
        orderBy: { created_at: 'desc' },
        take: 20
      })
    ]);

    res.json({
      summary: {
        totalVisits,
        uniqueVisitors: await prisma.deviceLogs.groupBy({
          by: ['ip_address'],
          where: { is_bot: false }
        }).then(groups => groups.length)
      },
      devices: devicesByType,
      browsers: browsers,
      operatingSystems: operatingSystems,
      countries: countries,
      recentActivity: recentActivity.map(activity => ({
        id: activity.device_log_id,
        ip: activity.ip_address,
        device: activity.device_type,
        browser: activity.browser,
        os: activity.os,
        country: activity.country,
        user: activity.customer ? `${activity.customer.name} (${activity.customer.email})` : 'Guest',
        time: activity.created_at
      }))
    });
  } catch (error) {
    console.error('Error getting analytics:', error);
    res.status(500).json({ error: 'Error getting analytics' });
  }
});

// Estadísticas para gráficas
router.get('/charts', async (req, res) => {
  try {
    const visitsByDay = await prisma.$queryRaw`
      SELECT 
        DATE(created_at) as date,
        COUNT(*) as visits,
        COUNT(DISTINCT ip_address) as unique_visitors
      FROM devicelogs 
      WHERE is_bot = false 
      GROUP BY DATE(created_at) 
      ORDER BY date DESC 
      LIMIT 30
    `;

    res.json({
      visitsByDay,
      environment: process.env.NODE_ENV
    });
  } catch (error) {
    console.error('Error getting chart data:', error);
    res.status(500).json({ error: 'Error getting chart data' });
  }
});

// Endpoint específico para el componente TrafficTable
router.get('/traffic-stats', async (req, res) => {
  try {
    const { period = 'month' } = req.query; // 'month', 'device', 'browser', 'os'

    let trafficData = [];

    switch (period) {
      case 'month':
        // Visitas por mes (últimos 6 meses)
        trafficData = await prisma.$queryRaw`
          SELECT 
            DATE_FORMAT(created_at, '%Y-%m') as month,
            COUNT(*) as count
          FROM devicelogs 
          WHERE is_bot = false 
          GROUP BY DATE_FORMAT(created_at, '%Y-%m')
          ORDER BY month DESC 
          LIMIT 6
        `;
        break;

      case 'device':
        // Dispositivos por tipo
        trafficData = await prisma.deviceLogs.groupBy({
          by: ['device_type'],
          where: { is_bot: false },
          _count: { device_log_id: true },
          orderBy: { _count: { device_log_id: 'desc' } }
        });
        trafficData = trafficData.map(item => ({
          device: item.device_type,
          count: item._count.device_log_id
        }));
        break;

      case 'browser':
        // Navegadores
        trafficData = await prisma.deviceLogs.groupBy({
          by: ['browser'],
          where: { is_bot: false },
          _count: { device_log_id: true },
          orderBy: { _count: { device_log_id: 'desc' } }
        });
        trafficData = trafficData.map(item => ({
          device: item.browser,
          count: item._count.device_log_id
        }));
        break;

      case 'os':
        // Sistemas operativos
        trafficData = await prisma.deviceLogs.groupBy({
          by: ['os'],
          where: { is_bot: false },
          _count: { device_log_id: true },
          orderBy: { _count: { device_log_id: 'desc' } }
        });
        trafficData = trafficData.map(item => ({
          device: item.os,
          count: item._count.device_log_id
        }));
        break;

      default:
        // Por defecto, dispositivos por tipo
        trafficData = await prisma.deviceLogs.groupBy({
          by: ['device_type'],
          where: { is_bot: false },
          _count: { device_log_id: true },
          orderBy: { _count: { device_log_id: 'desc' } }
        });
        trafficData = trafficData.map(item => ({
          device: item.device_type,
          count: item._count.device_log_id
        }));
    }

    res.json(trafficData);
  } catch (error) {
    console.error('Error getting traffic stats:', error);
    res.status(500).json({ error: 'Error getting traffic statistics' });
  }
});

// En routes/analytics.js - para el dashboard principal
router.get('/traffic-overview', async (req, res) => {
  try {
    const [
      totalVisits,
      uniqueVisitors,
      devicesByType,
      topBrowsers
    ] = await Promise.all([
      // Total de visitas
      prisma.deviceLogs.count({
        where: { is_bot: false }
      }),
      
      // Visitantes únicos
      prisma.deviceLogs.groupBy({
        by: ['ip_address'],
        where: { is_bot: false }
      }).then(groups => groups.length),
      
      // Dispositivos por tipo (top 3)
      prisma.deviceLogs.groupBy({
        by: ['device_type'],
        where: { is_bot: false },
        _count: { device_log_id: true },
        orderBy: { _count: { device_log_id: 'desc' } },
        take: 3
      }),
      
      // Navegadores top (top 3)
      prisma.deviceLogs.groupBy({
        by: ['browser'],
        where: { is_bot: false },
        _count: { device_log_id: true },
        orderBy: { _count: { device_log_id: 'desc' } },
        take: 3
      })
    ]);

    res.json({
      totalVisits,
      uniqueVisitors,
      topDevices: devicesByType.map(d => ({
        type: d.device_type,
        count: d._count.device_log_id
      })),
      topBrowsers: topBrowsers.map(b => ({
        browser: b.browser,
        count: b._count.device_log_id
      }))
    });
  } catch (error) {
    console.error('Error getting traffic overview:', error);
    res.status(500).json({ error: 'Error getting traffic overview' });
  }
});

export default router;