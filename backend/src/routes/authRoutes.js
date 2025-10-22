import express from "express";
import { register, login } from "../controllers/authController.js";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

// -------------------- AUTH --------------------
// POST /api/auth/register
router.post("/register", register);

// POST /api/auth/login
router.post("/login", login);

// -------------------- USERS --------------------
router.get("/users", async (req, res) => {
  try {
    // Obtener todos los tipos de usuarios
    const [customers, businessUsers, admins] = await Promise.all([
      // Customers
      prisma.customers.findMany({
        select: {
          customer_id: true,
          name: true,
          last_name: true,
          nametag: true,
          email: true,
          phone_number: true,
          created_at: true
        }
      }),
      // BusinessUsers
      prisma.businessUsers.findMany({
        select: {
          business_user_id: true,
          name: true,
          last_name: true,
          nametag: true,
          email: true,
          phone_number: true,
          created_at: true
        }
      }),
      // Admins
      prisma.admins.findMany({
        select: {
          admin_id: true,
          name: true,
          last_name: true,
          nametag: true,
          email: true,
          phone_number: true,
          created_at: true
        }
      })
    ]);

    // Combinar y formatear todos los usuarios
    const allUsers = [
      ...customers.map(customer => ({
        id: customer.customer_id,
        name: customer.name,
        lastName: customer.last_name,
        nametag: customer.nametag,
        email: customer.email,
        phoneNumber: customer.phone_number,
        userType: "customer",
        createdAt: customer.created_at
      })),
      ...businessUsers.map(businessUser => ({
        id: businessUser.business_user_id,
        name: businessUser.name,
        lastName: businessUser.last_name,
        nametag: businessUser.nametag,
        email: businessUser.email,
        phoneNumber: businessUser.phone_number,
        userType: "business",
        createdAt: businessUser.created_at
      })),
      ...admins.map(admin => ({
        id: admin.admin_id,
        name: admin.name,
        lastName: admin.last_name,
        nametag: admin.nametag,
        email: admin.email,
        phoneNumber: admin.phone_number,
        userType: "admin",
        createdAt: admin.created_at
      }))
    ];

    // Ordenar por fecha de creación
    allUsers.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.json(allUsers);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ error: "Error al cargar usuarios" });
  }
});

// -------------------- BUSINESSES --------------------
router.get("/businesses", async (req, res) => {
  try {
    const businesses = await prisma.businesses.findMany({
      include: {
        business_user: {
          select: { 
            business_user_id: true, 
            name: true, 
            last_name: true,
            nametag: true,
            email: true 
          }
        },
        business_subscriptions: {
          orderBy: { start_date: "desc" },
          take: 1,
          include: {
            plan: {
              select: { plan_id: true, name: true }
            }
          }
        },
        reviews: true,
        destinations: {
          include: { category: true }
        },
        experiences: {
          include: { category: true }
        }
      },
      orderBy: { created_at: "desc" }
    });

    res.json(
      businesses.map(b => {
        const category =
          b.destinations?.[0]?.category?.name ||
          b.experiences?.[0]?.category?.name ||
          "-";

        const location =
          b.business_address || b.destinations?.[0]?.location_string || "-";

        const nextBillingDate = b.business_subscriptions?.[0]?.next_billing_date || null;

        return {
          id: b.business_id,
          businessName: b.business_name,
          userName: `${b.business_user?.name || ''} ${b.business_user?.last_name || ''}`.trim() || "-",
          userNametag: b.business_user?.nametag || "-",
          userEmail: b.business_user?.email || "-",
          status: b.status,
          subscriptionStatus: b.subscription_status,
          currentPlan: b.business_subscriptions?.[0]?.plan?.name || "-",
          nextBillingDate,
          category,
          location,
          createdAt: new Date(b.created_at),
          reviewsCount: b.reviews.length,
          destinationsCount: b.destinations.length,
          experiencesCount: b.experiences.length
        };
      })
    );
  } catch (error) {
    console.error("Error al obtener negocios:", error);
    res.status(500).json({ error: "Error al cargar negocios" });
  }
});

// -------------------- DESTINATIONS --------------------
router.get("/destinations", async (req, res) => {
  try {
    const destinations = await prisma.destinations.findMany({
      include: {
        category: { select: { name: true } },
        business: { select: { business_name: true } }
      }
    });

    res.json(
      destinations.map((d, index) => {
        return {
          index: index + 1,
          id: d.destination_id,
          name: d.name,
          lodgingType: d.type,
          region: d.location_string || "-", 
          basePrice: d.price || 0,
          commissionRate: d.commission || 0,
          finalPrice: (d.price || 0) + ((d.price || 0) * ((d.commission || 0) / 100)),
          status: d.verified ? 'active' : 'inactive',
          verificationStatus: d.verified ? 'verified' : 'pending',
          category: d.category?.name || "-",
          businessName: d.business?.business_name || "-"
        };
      })
    );
  } catch (error) {
    console.error("Error al obtener destinos:", error);
    res.status(500).json({ error: "Error al cargar destinos" });
  }
});

// -------------------- EXPERIENCES --------------------
router.get("/experiences", async (req, res) => {
  try {
    const experiences = await prisma.experiences.findMany({
      include: {
        category: { select: { name: true } },
        business: { select: { business_name: true } },
        location: { select: { name: true } }
      }
    });

    res.json(
      experiences.map(exp => ({
        id: exp.experience_id,
        name: exp.name,
        description: exp.description,
        price: exp.price,
        date: exp.date,
        location: exp.location_string || exp.location?.name || "-",
        imageUrl: exp.image_url,
        moderationStatus: exp.moderation_status,
        category: exp.category?.name || "-",
        businessName: exp.business?.business_name || "-",
        createdAt: exp.created_at
      }))
    );
  } catch (error) {
    console.error("Error al obtener experiencias:", error);
    res.status(500).json({ error: "Error al cargar experiencias" });
  }
});

// -------------------- PAYMENTS --------------------
router.get("/payments", async (req, res) => {
  try {
    const payments = await prisma.payments.findMany({
      include: {
        customer: {
          select: {
            customer_id: true,
            name: true,
            last_name: true,
            email: true
          }
        },
        business: {
          select: {
            business_id: true,
            business_name: true
          }
        },
        itineraries: {
          take: 1
        }
      },
      orderBy: { payment_date: "desc" }
    });

    const formattedPayments = payments.map(p => ({
      id: p.payment_id,
      amount: p.amount,
      commission: p.amount * 0.15, // Calcular comisión del 15%
      status: p.status,
      paymentDate: p.payment_date,
      createdAt: p.created_at,
      cliente: `${p.customer?.name || ''} ${p.customer?.last_name || ''}`.trim() || "-",
      userId: p.customer?.customer_id,
      userEmail: p.customer?.email,
      businessId: p.business?.business_id,
      businessName: p.business?.business_name || "-",
    }));

    res.json(formattedPayments);
  } catch (error) {
    console.error("Error al obtener pagos:", error);
    res.status(500).json({ error: "Error al cargar pagos" });
  }
});

// -------------------- ADMINS --------------------
router.get("/admins", async (req, res) => {
  try {
    const admins = await prisma.admins.findMany({
      include: {
        user_roles: {
          include: {
            role: {
              select: { name: true }
            }
          }
        }
      }
    });

    const formattedAdmins = admins.map(admin => ({
      id: admin.admin_id,
      name: admin.name,
      lastName: admin.last_name,
      email: admin.email,
      nametag: admin.nametag,
      roles: admin.user_roles.map(ur => ur.role.name),
      createdAt: admin.created_at
    }));

    res.json(formattedAdmins);
  } catch (error) {
    console.error("Error al obtener administradores:", error);
    res.status(500).json({ error: "Error al cargar administradores" });
  }
});

// -------------------- ACTIVITY LOGS --------------------
router.get("/admin-activities", async (req, res) => {
  try {
    const activities = await prisma.adminLogs.findMany({
      include: {
        admin: {
          select: {
            admin_id: true,
            name: true,
            email: true
          }
        }
      },
      orderBy: {
        created_at: "desc"
      }
    });

    const formattedActivities = activities.map(activity => ({
      id: activity.log_id,
      action: activity.action,
      targetType: activity.target_type,
      targetId: activity.target_id,
      admin: {
        id: activity.admin.admin_id,
        name: activity.admin.name,
        email: activity.admin.email
      },
      createdAt: activity.created_at
    }));

    res.json(formattedActivities);
  } catch (error) {
    console.error("Error al obtener actividades:", error);
    res.status(500).json({ error: "Error al cargar actividades" });
  }
});

// -------------------- TRAFFIC (Visitas y Dispositivos) --------------------
// En tu routes/analytics.js o donde tengas el endpoint de traffic
router.get('/traffic', async (req, res) => {
  try {
    // Datos REALES de visitas por mes (últimos 6 meses)
    const visitsByMonth = await prisma.$queryRaw`
      SELECT 
        DATE_FORMAT(created_at, '%Y-%m') as month,
        COUNT(*) as count
      FROM devicelogs 
      WHERE is_bot = false 
        AND created_at >= DATE_SUB(NOW(), INTERVAL 6 MONTH)
      GROUP BY DATE_FORMAT(created_at, '%Y-%m')
      ORDER BY month ASC
    `;

    // Formatear los meses para que se vean mejor
    const formattedVisitsByMonth = visitsByMonth.map(item => ({
      month: formatMonth(item.month),
      count: Number(item.count)
    }));

    // Datos REALES de dispositivos
    const devicesUsage = await prisma.deviceLogs.groupBy({
      by: ['device_type'],
      where: { is_bot: false },
      _count: { device_log_id: true },
      orderBy: { _count: { device_log_id: 'desc' } }
    });

    // Formatear para que coincida con tu estructura actual
    const formattedDevicesUsage = devicesUsage.map(item => ({
      device: formatDeviceType(item.device_type),
      count: item._count.device_log_id
    }));

    // Datos adicionales que podrías querer mostrar
    const browsers = await prisma.deviceLogs.groupBy({
      by: ['browser'],
      where: { is_bot: false },
      _count: { device_log_id: true },
      orderBy: { _count: { device_log_id: 'desc' } },
      take: 5
    });

    const operatingSystems = await prisma.deviceLogs.groupBy({
      by: ['os'],
      where: { is_bot: false },
      _count: { device_log_id: true },
      orderBy: { _count: { device_log_id: 'desc' } },
      take: 5
    });

    res.json({
      visitsByMonth: formattedVisitsByMonth,
      devicesUsage: formattedDevicesUsage,
      browsers: browsers.map(b => ({ browser: b.browser, count: b._count.device_log_id })),
      operatingSystems: operatingSystems.map(os => ({ os: os.os, count: os._count.device_log_id })),
      totalVisits: await prisma.deviceLogs.count({ where: { is_bot: false } }),
      uniqueVisitors: await prisma.deviceLogs.groupBy({
        by: ['ip_address'],
        where: { is_bot: false }
      }).then(groups => groups.length)
    });
  } catch (error) {
    console.error('Error al obtener métricas de tráfico:', error);
    
    // Fallback a datos mock si hay error
    const visitsByMonth = [
      { month: 'Enero', count: 120 },
      { month: 'Febrero', count: 150 },
      { month: 'Marzo', count: 90 },
      { month: 'Abril', count: 200 }
    ];

    const devicesUsage = [
      { device: 'Desktop', count: 300 },
      { device: 'Mobile', count: 500 },
      { device: 'Tablet', count: 100 }
    ];

    res.json({ visitsByMonth, devicesUsage });
  }
});

// Función helper para formatear meses
function formatMonth(monthString) {
  const [year, month] = monthString.split('-');
  const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  return `${months[parseInt(month) - 1]} ${year}`;
}

// Función helper para formatear tipos de dispositivo
function formatDeviceType(deviceType) {
  const types = {
    'desktop': 'Desktop',
    'mobile': 'Mobile', 
    'tablet': 'Tablet',
    'bot': 'Bot'
  };
  return types[deviceType] || deviceType;
}

export default router;