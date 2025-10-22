// pages/api/auth/change-password.js
import { PrismaClient } from '@prisma/client';
import { getSession } from 'next-auth/react';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const session = await getSession({ req });
  
  if (!session) {
    return res.status(401).json({ error: 'No autenticado' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const { currentPassword, newPassword } = req.body;
    
    // Obtener usuario actual
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });
    
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    
    // Verificar contraseña actual
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isCurrentPasswordValid) {
      return res.status(400).json({ error: 'Contraseña actual incorrecta' });
    }
    
    // Hashear nueva contraseña
    const hashedNewPassword = await bcrypt.hash(newPassword, 12);
    
    // Actualizar contraseña
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedNewPassword }
    });
    
    res.json({ success: true, message: 'Contraseña actualizada correctamente' });
  } catch (error) {
    console.error('Error cambiando contraseña:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}