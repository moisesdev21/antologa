// src/components/MainLayout.jsx
import React from 'react';

/**
 * MainLayout Componente Principal del Layout
 *
 * Configura:
 * - Shell global (Header/Footer, ancho completo).
 * - Cuadrícula de 12 columnas (grid grid-cols-12).
 * - Gutter de 32px (gap-8).
 * - Tipografía base (font-body).
 *
 * NOTA: Los elementos hijos deben usar la clase col-span-X para ubicarse
 * dentro de la cuadrícula de 12 columnas.
 */
const MainLayout = ({ children }) => {
  return (
    // Usa la fuente 'body' (Nunito) como fuente base para todo el layout
    <div className="min-h-screen bg-gray-50 font-body"> 
      
      {/* HEADER: Elemento de ancho completo */}
      
      
      {/* CUERPO PRINCIPAL DEL CONTENIDO */}
      <main className="flex-1 w-full">
        
        {/* Contenedor Centrado - ELIMINADO para permitir secciones de ancho completo */}
        {/* Las secciones ahora controlan su propio ancho y padding */}
          
        {/* DEFINICIÓN DE LA CUADRÍCULA DE 12 COLUMNAS Y EL GUTTER DE 32px */}
        <div className="grid grid-cols-12 gap-8 w-full">
          
          {/* Aquí se renderizan los componentes de página. 
            Cada componente debe usar col-span-X (por ejemplo: col-span-12)
            para alinearse a la cuadrícula.
          */}
          {children}
          
        </div>
        
      </main>

      {/* FOOTER: Elemento de ancho completo */}
     
      
    </div>
  );
};

export default MainLayout;