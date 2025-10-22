// pages/api/admin-activities/index.js
import { PrismaClient } from '@prisma/client';
import { getSession } from 'next-auth/react';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const session = await getSession({ req });
  
  if (!session) {
    return res.status(403).json({ error: 'No autorizado' });
  }

  try {
    if (req.method === 'GET') {
      const activities = await prisma.adminActivity.findMany({
        include: {
          admin: {
            include: {
              user: {
                select: {
                  name: true
                }
              }
            }
          }
        },
        orderBy: {
          timestamp: 'desc'
        },
        take: 50 // Últimas 50 actividades
      });
      
      const formattedActivities = activities.map(activity => ({
        id: activity.id,
        admin: activity.admin.user.name,
        action: activity.action,
        target: activity.target,
        details: activity.details,
        ip: activity.ipAddress,
        timestamp: activity.timestamp
      }));
      
      res.json(formattedActivities);
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Error en API admin-activities:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}