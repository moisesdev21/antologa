// src/pages/Dashboard.jsx
import { useState, useEffect } from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import Header from '../components/dashboard/Header';
import StatsGrid from '../components/dashboard/StatsGrid';
import DataTable from '../components/dashboard/DataTable';
import ChartSection from '../components/dashboard/ChartSection';
import SalesRevenue from '../components/dashboard/SalesRevenue';
import ProfileSection from '../components/dashboard/ProfileSection';
import useDashboardData from '../hooks/useDashboardData';
import TrafficTable from '../components/dashboard/TrafficTable';
import DailyActivities from "../components/dashboard/DailyActivities";
import YearlyUpdates from "../components/dashboard/YearlyUpdates";
// COMPONENTES DEL DASHBOARD
import BusinessDB from '../components/dashboard/BusinessDB';
import DestinationsDB from '../components/dashboard/DestinationsDB';
import ExperiencesDB from '../components/dashboard/ExperiencesDB';
import RevenueUpdates from "../components/dashboard/RevenueUpdates";
import TotalProfit from "../components/dashboard/TotalProfit";
import TodayMoneyCard from "../components/dashboard/TodayMoneyCard";
import UsersCard from "../components/dashboard/UsersCard";
import NewClientsCard from "../components/dashboard/NewClientsCard";
import RecentTransactions from "../components/dashboard/RecentTransactions";

// Importar MainLayout
import MainLayout from '../layouts/MainLayout';

// Iconos
import { Menu, X } from 'lucide-react';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [currentAdmin, setCurrentAdmin] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const { 
    metrics, 
    loading, 
    error, 
    users, 
    businesses, 
    destinations, 
    experiences, 
    payments, 
    articles,
    categories,
    reviews,
    admins,
    activityLogs,
    refetch,
    // Funciones CRUD
    createArticle,
    updateArticle,
    deleteArticle,
    createCategory,
    updateCategory,
    deleteCategory,
    approveReview,
    rejectReview,
    deleteReview
  } = useDashboardData();

  useEffect(() => {
    // Simular datos del admin logueado
    setCurrentAdmin({ 
      name: "Natalia",
      email: "natalia@example.com" 
    });
  }, []);

  const userColumns = [
    { key: 'id', title: 'ID' },
    { key: 'name', title: 'Nombre' },
    { key: 'email', title: 'Email' },
    { key: 'userType', title: 'Tipo' },
    { 
      key: 'createdAt', 
      title: 'Fecha Registro',
      render: (user) => new Date(user.createdAt).toLocaleDateString('es-ES')
    }
  ];

  return (
    <div className="flex min-h-screen bg-white dark:bg-dark-bg w-full transition-colors duration-300">
      {/* Sidebar */}
      <div className="fixed z-50 inset-y-0 left-0 text-[#282828] dark:text-gray-200">
        <Sidebar 
          activeSection={activeSection} 
          setActiveSection={setActiveSection}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
      </div>

      {/* Contenido principal */}
      <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${
        sidebarOpen ? 'ml-80' : 'ml-24'
      }`}>
        {/* Secciones - CONTENIDO CON MAINLAYOUT */}
        <div className="flex-1 w-full p-6 overflow-auto">
          <div className="h-full w-full">
            {error && (
              <div className="col-span-12 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-lg p-4 mb-8 w-full transition-colors duration-300">
                <p className="text-red-800 dark:text-red-200">{error}</p>
              </div>
            )}

            {/* DASHBOARD PRINCIPAL */}
{activeSection === 'dashboard' && (
  <div className="flex flex-col gap-[40px] bg-white dark:bg-[#282828] w-full p-6 transition-colors duration-300">

    {/* ============== ROW 1: WELCOME (8) + EARNINGS (4) ============== */}
    <div className="grid grid-cols-12 gap-6">

      {/* WELCOME */}
      <div className="col-span-8 h-[300px] rounded-[12px] bg-[#F8F8F8] shadow-md dark:bg-[#282828] dark:shadow-md relative overflow-hidden transition-colors duration-300">
        <div
          className="absolute w-[327px] h-[249px] bg-contain bg-no-repeat bg-center right-0 top-6 opacity-10"
          style={{ backgroundImage: "url('https://png.pngtree.com/png-vector/20200428/ourlarge/pngtree-a-man-who-works-at-a-computer-png-image_2195281.jpg')" }}
        />
        <div className="relative z-10 p-8 h-full flex flex-col justify-between">
          <div className="flex flex-col gap-4">
            <h1 className="text-[#2A3547] dark:text-white font-inter text-[21px] font-semibold">
              {currentAdmin ? `Welcome back ${currentAdmin.name}!` : 'Welcome back, Admin!'}
            </h1>
            <p className="text-[#7C8FAC] dark:text-gray-400 font-nunito text-[14px]">
              You have earned <span className="text-green-600 font-semibold">
                {metrics?.growthPercentage?.toFixed(0) || '54'}%
              </span> more than last month which is great thing.
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-[#2A3547] dark:text-white font-plus-jakarta text-[21px] font-semibold">
                ${metrics?.totalRevenue?.toFixed(2) || '2,584.50'}
              </span>
              <span className="text-[#7C8FAC] dark:text-gray-400 font-plus-jakarta text-[14px] font-semibold">
                Year {new Date().getFullYear()}
              </span>
            </div>
          </div>
          <button className="w-[90px] h-[36px] bg-[#C45A32] hover:bg-[#B34A22] text-white rounded-[4px] text-sm font-semibold transition-colors duration-300">
            Check
          </button>
        </div>
      </div>

      {/* EARNINGS */}
      <div className="col-span-4 h-[300px] rounded-[12px] bg-[#F8F8F8] dark:bg-dark-surface p-6 flex flex-col justify-between transition-colors duration-300">
        <div>
          <span className="text-[#7C8FAC] dark:text-gray-400 text-[14px]">Earnings</span>
          <h2 className="text-[#2A3547] dark:text-white text-[28px] font-semibold">
            ${metrics?.totalRevenue?.toFixed(2) || '2,584.50'}
          </h2>
          <p className="text-[#7C8FAC] dark:text-gray-400 text-[14px] flex items-center gap-1">
            <span className="text-green-600">+5.6%</span> this week
          </p>
        </div>
        <div className="flex items-end gap-1 h-[100px]">
          {[26,35,35,47,43,35,23,43,26].map((h, i) => (
            <div key={i} className="w-[5px] rounded-[2px] bg-[#C45A32]" style={{ height: h }} />
          ))}
        </div>
      </div>
    </div>

    {/* ============== ROW 2: 3 SMALL CARDS ============== */}
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-4"><TodayMoneyCard amount={metrics?.totalRevenue || 0} /></div>
      <div className="col-span-4"><UsersCard totalUsers={metrics?.totalUsers || 0} /></div>
      <div className="col-span-4"><NewClientsCard totalBusinesses={metrics?.totalBusinesses || 0} /></div>
    </div>

    {/* ============== ROW 3: REVENUE (8) + TOTAL PROFIT (4) ============== */}
    <div className="grid grid-cols-12 gap-6 ">
      <div className="col-span-8 h-[450px] rounded-[12px] bg-white dark:bg-dark-surface shadow-md p-4 transition-colors duration-300">
        <RevenueUpdates payments={payments} loading={loading} />
      </div>
      <div className="col-span-4 h-[450px] rounded-[12px] bg-white dark:bg-dark-surface shadow-md p-4 transition-colors duration-300">
        <TotalProfit payments={payments} loading={loading} />
      </div>
    </div>

    {/* ============== ROW 4: RECENT (4) + DAILY (4) + YEARLY (4) ============== */}
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-4 h-[525px] rounded-[12px] bg-white dark:bg-dark-surface shadow-md p-4 transition-colors duration-300">
        <RecentTransactions payments={payments} />
      </div>
      <div className="col-span-4 h-[525px] rounded-[12px] bg-white dark:bg-dark-surface shadow-md p-4 transition-colors duration-300">
        <DailyActivities payments={payments} users={users} loading={loading} />
      </div>
      <div className="col-span-4 h-[411px] rounded-[12px] bg-white dark:bg-dark-surface shadow-md p-4 transition-colors duration-300">
        <YearlyUpdates payments={payments} loading={loading} />
      </div>
    </div>

  </div>
)}

            {/* BASE DE DATOS DE USUARIOS */}
{activeSection === 'users' && (
  <MainLayout>
    <div className="col-span-12 bg-white dark:bg-gray-900  p-5 transition-colors duration-300">
      <div className="flex justify-between items-center mb-6 w-full h-[120px]">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Usuarios Registrados ({users.length})
        </h2>
        <button 
          onClick={refetch} 
          className="bg-blue-500 text-white px-10 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300 dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          Actualizar
        </button>
      </div>
      <div className="w-full">
        <DataTable 
          data={users}
          columns={userColumns}
          loading={loading}
          emptyMessage="No hay usuarios registrados"
        />
      </div>
    </div>
  </MainLayout>
)}

            {/* BUSINESS DB - NEGOCIOS AFILIADOS */}
            {activeSection === 'business' && (
              <div className="w-full">
                <BusinessDB 
                  businesses={businesses} 
                  loading={loading} 
                  onRefresh={refetch} 
                />
              </div>
            )}

            {/* DESTINATIONS DB - BASE DE DATOS DE HOSPEDAJES */}
            {activeSection === 'destinations' && (
              <MainLayout>
                <div className="col-span-12">
                  <DestinationsDB 
                    destinations={destinations} 
                    loading={loading} 
                    onRefresh={refetch} 
                  />
                </div>
              </MainLayout>
            )}

            {/* EXPERIENCES DB - GESTIÓN COMPLETA DE EXPERIENCIAS */}
            {activeSection === 'experiences' && (
              <MainLayout>
                <div className="col-span-12 dark:bg-gray-900">
                  <ExperiencesDB 
                    experiences={experiences}
                    articles={articles}
                    categories={categories}
                    reviews={reviews}
                    loading={loading}
                    onRefresh={refetch}
                    onCreateArticle={createArticle}
                    onUpdateArticle={updateArticle}
                    onDeleteArticle={deleteArticle}
                    onCreateCategory={createCategory}
                    onUpdateCategory={updateCategory}
                    onDeleteCategory={deleteCategory}
                    onApproveReview={approveReview}
                    onRejectReview={rejectReview}
                    onDeleteReview={deleteReview}
                  />
                </div>
              </MainLayout>
            )}

            {/* SALES & REVENUE - VENTAS E INGRESOS */}
            {activeSection === 'sales' && (
              <MainLayout>
                <div className="col-span-12">
                  <SalesRevenue 
                    payments={payments}
                    businesses={businesses}
                    users={users}
                    loading={loading}
                    onRefresh={refetch}
                  />
                </div>
              </MainLayout>
            )}

            {/* SITE TRAFFIC INSIGHTS */}
{activeSection === 'traffic' && (
  <MainLayout>
    <div className="col-span-12">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm transition-colors duration-300">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
                Site Traffic Insights
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-base">
                Métricas de tráfico en tiempo real - {metrics?.totalVisits || 0} visitas registradas
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              <button
                onClick={refetch}
                disabled={loading}
                className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Actualizar
              </button>
            </div>
          </div>
        </div>

        {/* Contenido */}
        <div className="p-6 space-y-6">
          {/* Métricas rápidas */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Total de visitas */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border-l-4 border-blue-500 transition-colors duration-300">
              <h3 className="text-base font-medium text-gray-700 dark:text-gray-300 mb-1">Total Visitas</h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{metrics?.totalVisits || 0}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Registros totales</p>
            </div>

            {/* Visitantes únicos */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border-l-4 border-green-500 transition-colors duration-300">
              <h3 className="text-base font-medium text-gray-700 dark:text-gray-300 mb-1">Visitantes Únicos</h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{metrics?.uniqueVisitors || 0}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">IPs distintas</p>
            </div>

            {/* Dispositivo principal */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border-l-4 border-purple-500 transition-colors duration-300">
              <h3 className="text-base font-medium text-gray-700 dark:text-gray-300 mb-1">Dispositivo Principal</h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {metrics?.devicesUsage?.[0]?.device || 'N/A'}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {metrics?.devicesUsage?.[0]?.count || 0} visitas
              </p>
            </div>

            {/* Navegador principal */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border-l-4 border-orange-500 transition-colors duration-300">
              <h3 className="text-base font-medium text-gray-700 dark:text-gray-300 mb-1">Navegador Principal</h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {metrics?.browsers?.[0]?.browser || 'N/A'}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {metrics?.browsers?.[0]?.count || 0} visitas
              </p>
            </div>
          </div>

          {/* Gráficos principales */}
          <div className="grid grid-cols-1 2xl:grid-cols-2 gap-6">
            {/* Gráfico de visitas mensuales */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 transition-colors duration-300">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Visitas por Mes</h3>
              {metrics?.visitsByMonth?.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={metrics.visitsByMonth}>
                    <CartesianGrid 
                      strokeDasharray="3 3" 
                      stroke={document.documentElement.classList.contains('dark') ? "#f8f8f8" : "#ffffffff"} 
                    />
                    <XAxis 
                      dataKey="month" 
                      angle={-45}
                      textAnchor="end"
                      height={80}
                      tick={{ fontSize: 12 }}
                      stroke={document.documentElement.classList.contains('dark') ? "#f8f8f8" : "#f8f8f8"}
                      tickLine={false}
                    />
                    <YAxis 
                      stroke={document.documentElement.classList.contains('dark') ? "#f8f8f8" : "#f8f8f8"}
                      tickLine={false}
                    />
                    <Tooltip 
                      formatter={(value) => [`${value} visitas`, 'Visitas']}
                      labelFormatter={(label) => `Mes: ${label}`}
                      contentStyle={{ 
                        backgroundColor: document.documentElement.classList.contains('dark') ? '#f8f8f8' : '#FFFFFF',
                        borderColor: document.documentElement.classList.contains('dark') ? '#f8f8f8' : '#E5E7EB',
                        color: document.documentElement.classList.contains('dark') ? '#FFFFFF' : '#f8f8f8',
                        borderRadius: '8px'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="count" 
                      stroke="#3b82f6" 
                      strokeWidth={2}
                      dot={{ fill: '#3b82f6', r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-40">
                  <p className="text-gray-600 dark:text-gray-400">No hay datos de visitas disponibles</p>
                </div>
              )}
            </div>

            {/* Gráfico de dispositivos */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 transition-colors duration-300">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Dispositivos de Acceso</h3>
              {metrics?.devicesUsage?.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={metrics.devicesUsage}>
                    <CartesianGrid 
                      strokeDasharray="3 3" 
                      stroke={document.documentElement.classList.contains('dark') ? "#f8f8f8" : "#EAEFF4"} 
                    />
                    <XAxis 
                      dataKey="device" 
                      tick={{ fontSize: 12 }}
                      stroke={document.documentElement.classList.contains('dark') ? "#f8f8f8" : "#f8f8f8"}
                      tickLine={false}
                    />
                    <YAxis 
                      stroke={document.documentElement.classList.contains('dark') ? "#f8f8f8" : "#f8f8f8"}
                      tickLine={false}
                    />
                    <Tooltip 
                      formatter={(value) => [`${value} visitas`, 'Visitas']}
                      contentStyle={{ 
                        backgroundColor: document.documentElement.classList.contains('dark') ? '#f8f8f8' : '#FFFFFF',
                        borderColor: document.documentElement.classList.contains('dark') ? '#f8f8f8' : '#E5E7EB',
                        color: document.documentElement.classList.contains('dark') ? '#FFFFFF' : '#1F2937',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar 
                      dataKey="count" 
                      fill="#10b981" 
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-40">
                  <p className="text-gray-600 dark:text-gray-400">No hay datos de dispositivos disponibles</p>
                </div>
              )}
            </div>
          </div>

          {/* Gráficos adicionales */}
          <div className="grid grid-cols-1 2xl:grid-cols-2 gap-6">
            {/* Gráfico de navegadores */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 transition-colors duration-300">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Navegadores Más Usados</h3>
              {metrics?.browsers?.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={metrics.browsers}>
                    <CartesianGrid 
                      strokeDasharray="3 3" 
                      stroke={document.documentElement.classList.contains('dark') ? "#f8f8f8" : "#EAEFF4"} 
                    />
                    <XAxis 
                      dataKey="browser" 
                      tick={{ fontSize: 12 }}
                      stroke={document.documentElement.classList.contains('dark') ? "#f8f8f8" : "#6B7280"}
                      tickLine={false}
                    />
                    <YAxis 
                      stroke={document.documentElement.classList.contains('dark') ? "#f8f8f8" : "#6B7280"}
                      tickLine={false}
                    />
                    <Tooltip 
                      formatter={(value) => [`${value} visitas`, 'Visitas']}
                      contentStyle={{ 
                        backgroundColor: document.documentElement.classList.contains('dark') ? '#f8f8f8' : '#FFFFFF',
                        borderColor: document.documentElement.classList.contains('dark') ? '#f8f8f8' : '#E5E7EB',
                        color: document.documentElement.classList.contains('dark') ? '#FFFFFF' : '#f8f8f8',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar 
                      dataKey="count" 
                      fill="#f59e0b" 
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-40">
                  <p className="text-gray-600 dark:text-gray-400">No hay datos de navegadores disponibles</p>
                </div>
              )}
            </div>

            {/* Gráfico de sistemas operativos */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 transition-colors duration-300">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Sistemas Operativos</h3>
              {metrics?.operatingSystems?.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={metrics.operatingSystems}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ os, count }) => `${os}: ${count}`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {metrics.operatingSystems.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'][index % 5]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => [`${value} visitas`, 'Visitas']}
                      contentStyle={{ 
                        backgroundColor: document.documentElement.classList.contains('dark') ? '#f8f8f8' : '#FFFFFF',
                        borderColor: document.documentElement.classList.contains('dark') ? '#f8f8f8' : '#E5E7EB',
                        color: document.documentElement.classList.contains('dark') ? '#FFFFFF' : '#f8f8f8',
                        borderRadius: '8px'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-40">
                  <p className="text-gray-600 dark:text-gray-400">No hay datos de sistemas operativos disponibles</p>
                </div>
              )}
            </div>
          </div>

          {/* Información del sistema */}
          <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-lg p-4 transition-colors duration-300">
            <div className="flex items-start">
              <div className="text-blue-500 dark:text-blue-400 mr-3 mt-1">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-blue-800 dark:text-blue-200 font-medium">Sistema de Tracking Activo</p>
                <p className="text-blue-600 dark:text-blue-300 text-sm">
                  Estos datos se actualizan automáticamente con cada dispositivo que se conecta a tu aplicación.
                  {metrics?.totalVisits && ` ${metrics.totalVisits} registros capturados.`}
                  {metrics?.uniqueVisitors && ` ${metrics.uniqueVisitors} visitantes únicos.`}
                </p>
                <p className="text-blue-500 dark:text-blue-400 text-xs mt-1">
                  Última actualización: {new Date().toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
)}

            {/* ADMINISTRACIÓN DEL SISTEMA */}
            {activeSection === 'profile' && (
              <MainLayout>
                <div className="col-span-12">
                  <ProfileSection 
                    admins={admins}
                    activityLogs={activityLogs}
                    loading={loading}
                    onRefresh={refetch}
                  />
                </div>
              </MainLayout>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}