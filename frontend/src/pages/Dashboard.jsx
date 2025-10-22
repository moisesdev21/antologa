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
    <div className="flex min-h-screen bg-white w-full">
      {/* Sidebar */}
      <div className="fixed z-50 inset-y-0 left-0">
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
              <div className="col-span-12 bg-red-50 border border-red-200 rounded-lg p-4 mb-8 w-full">
                <p className="text-red-800">{error}</p>
              </div>
            )}

            {/* DASHBOARD PRINCIPAL */}
            {activeSection === 'dashboard' && (
              <MainLayout className="flex flex-col gap-[65px] bg-white overflow-hidden">
                
                {/* FIRST ROW - WELCOME AND EARNINGS SIDE BY SIDE */}
                <div className="col-span-12 flex gap-6">
                  
                  {/* WELCOME CONTAINER */}
                  <div className="col-span-8 h-[300px] flex-shrink-0 rounded-[12px] bg-[#F8F8F8] relative overflow-hidden">
                    
                    {/* Background Image Layer */}
                    <div 
                      className="absolute w-[327px] h-[249px] flex-shrink-0 bg-contain bg-no-repeat bg-center right-0 top-6 opacity-10"
                      style={{ backgroundImage: "url('https://png.pngtree.com/png-vector/20200428/ourlarge/pngtree-a-man-who-works-at-a-computer-png-image_2195281.jpg')" }}
                    ></div>

                    {/* Content Container */}
                    <div className="relative z-10 p-8 h-full flex">
                      
                      {/* Welcome Message Section */}
                      <div className="w-[285px] h-[225px] flex flex-col items-start gap-6 flex-shrink-0">
                        
                        {/* Text Content */}
                        <div className="flex flex-col gap-6">
                          {/* Title */}
                          <h1 className="text-[#2A3547] font-plus-jakarta text-[21px] font-semibold leading-[130%]">
                            {currentAdmin ? `Welcome back ${currentAdmin.name}!` : 'Welcome back, Admin!'}
                          </h1>
                          
                          {/* Description con estilos específicos */}
                          <p className="w-[285px] text-[#7C8FAC] font-plus-jakarta text-[14px] font-normal leading-[140%] tracking-[-0.28px]">
                            You have earned <span className="text-green-600 font-semibold">
                              {metrics?.growthPercentage?.toFixed(0) || '54'}% more
                            </span> than last month which is great thing.
                          </p>
                        </div>

                        {/* Amount and Year en la misma línea */}
                        <div className="flex flex-col gap-1">
                          <div className="flex items-baseline gap-2">
                            {/* Amount */}
                            <span className="text-[#2A3547] font-plus-jakarta text-[21px] font-semibold leading-[130%]">
                              ${metrics?.totalRevenue?.toFixed(2) || '2,584.50'}
                            </span>
                            
                            {/* Year al lado del amount */}
                            <span className="text-[#7C8FAC] font-plus-jakarta text-[14px] font-semibold leading-[140%] tracking-[-0.14px]">
                              Year {new Date().getFullYear()}
                            </span>
                          </div>
                        </div>

                        {/* Check Button */}
                        <button className="flex h-[36px] px-4 items-center gap-1 flex-shrink-0 rounded-[4px] bg-[#C45A32] hover:bg-[#B34A22] transition-colors">
                          <span className="text-white text-sm font-semibold font-plus-jakarta">
                            Check
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* EARNINGS CONTAINER */}
                  <div className="col-span-4 h-[160.366px] flex-shrink-0 rounded-[12px] bg-[#F8F8F8] flex items-center justify-between px-6">
                    
                    {/* Earnings Text Section */}
                    <div className="w-[124.798px] h-[76.068px] flex flex-col items-start gap-5 flex-shrink-0">
                      
                      {/* Title */}
                      <span className="text-[#7C8FAC] font-plus-jakarta text-[14px] font-normal leading-[140%] tracking-[-0.28px]">
                        Earnings
                      </span>
                      
                      {/* Amount */}
                      <span className="text-[#2A3547] font-plus-jakarta text-[24px] font-semibold leading-[120%]">
                        ${metrics?.totalRevenue?.toFixed(2) || '2,584.50'}
                      </span>
                      
                      {/* Comparison Text with Icon */}
                      <div className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                          <path d="M11.8626 12.4036L12.5626 11.7036L5.9959 5.13689L11.9626 5.13689V4.13689L4.2959 4.13689L4.2959 11.8036H5.2959L5.2959 5.83689L11.8626 12.4036Z" fill="#078282"/>
                        </svg>
                        <span className="text-[#7C8FAC] font-plus-jakarta text-[14px] font-normal leading-[140%] tracking-[-0.28px]">
                          +5.6% this week
                        </span>
                      </div>
                    </div>

                    {/* Icon Graphics Section */}
                    <div className="w-[122.55px] h-[46.431px] flex items-end gap-1 flex-shrink-0">
                      {/* Bar 1 */}
                      <div className="w-[5px] h-[26px] flex-shrink-0 rounded-[2px] bg-[#C45A32]"></div>
                      {/* Bar 2 */}
                      <div className="w-[5px] h-[35px] flex-shrink-0 rounded-[2px] bg-[#C45A32]"></div>
                      {/* Bar 3 */}
                      <div className="w-[5px] h-[35px] flex-shrink-0 rounded-[2px] bg-[#C45A32]"></div>
                      {/* Bar 4 */}
                      <div className="w-[5px] h-[47px] flex-shrink-0 rounded-[2px] bg-[#C45A32]"></div>
                      {/* Bar 5 */}
                      <div className="w-[5px] h-[43px] flex-shrink-0 rounded-[2px] bg-[#C45A32]"></div>
                      {/* Bar 6 */}
                      <div className="w-[5px] h-[35px] flex-shrink-0 rounded-[2px] bg-[#C45A32]"></div>
                      {/* Bar 7 */}
                      <div className="w-[5px] h-[23px] flex-shrink-0 rounded-[2px] bg-[#C45A32]"></div>
                      {/* Bar 8 */}
                      <div className="w-[5px] h-[43px] flex-shrink-0 rounded-[2px] bg-[#C45A32]"></div>
                      {/* Bar 9 */}
                      <div className="w-[5px] h-[26px] flex-shrink-0 rounded-[2px] bg-[#C45A32]"></div>
                    </div>
                  </div>
                </div>

                {/* ANALYTICS CARDS ROW */}
                <div className="col-span-12 flex gap-6">
                  
                  {/* CARD 1 - TODAY'S MONEY */}
                  <div className="col-span-4 h-[80px] flex-shrink-0 rounded-[15px] bg-[#F8F8F8] shadow-[0_3.5px_5.5px_0_rgba(0,0,0,0.02)] flex items-center justify-between px-6">
                    
                    {/* Text Content */}
                    <div className="w-[107.538px] flex flex-col items-start gap-1">
                      <span className="w-[99px] h-[18px] text-[#A0AEC0] font-montserrat text-[12px] font-bold leading-[150%]">
                        Today's Money
                      </span>
                      <span className="w-[65.829px] h-[25px] text-[#2D3748] font-helvetica text-[18px] font-bold leading-[140%]">
                        ${metrics?.totalRevenue?.toFixed(2) || '0.00'}
                      </span>
                      <span className="text-[#48BB78] font-helvetica text-[14px] font-bold leading-[140%]">
                        +5.6%
                      </span>
                    </div>

                    {/* Icon */}
                    <div className="w-[32px] h-[32px] flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="33" height="32" viewBox="0 0 33 32" fill="none">
                        <path d="M6.07415 6.49693H26.0741C26.3078 6.49682 26.5412 6.51164 26.7729 6.54131C26.6943 5.98992 26.5049 5.46014 26.2161 4.98393C25.9273 4.50771 25.545 4.09492 25.0923 3.77044C24.6397 3.44595 24.126 3.2165 23.5822 3.09592C23.0385 2.97533 22.4759 2.96611 21.9285 3.06881L5.4804 5.87693H5.46165C4.4292 6.07437 3.51106 6.65851 2.89478 7.51006C3.82327 6.84964 4.93474 6.49546 6.07415 6.49693Z" fill="#C45A32"/>
                        <path d="M26.0743 7.99976H6.07434C5.01383 8.00091 3.99709 8.42271 3.24719 9.17261C2.4973 9.9225 2.0755 10.9392 2.07434 11.9998V23.9998C2.0755 25.0603 2.4973 26.077 3.24719 26.8269C3.99709 27.5768 5.01383 27.9986 6.07434 27.9998H26.0743C27.1348 27.9986 28.1516 27.5768 28.9015 26.8269C29.6514 26.077 30.0732 25.0603 30.0743 23.9998V11.9998C30.0732 10.9392 29.6514 9.9225 28.9015 9.17261C28.1516 8.42271 27.1348 8.00091 26.0743 7.99976ZM23.1056 19.9998C22.71 19.9998 22.3233 19.8825 21.9944 19.6627C21.6655 19.4429 21.4092 19.1306 21.2578 18.7651C21.1064 18.3997 21.0668 17.9975 21.144 17.6096C21.2212 17.2216 21.4117 16.8652 21.6914 16.5855C21.9711 16.3058 22.3274 16.1154 22.7154 16.0382C23.1034 15.961 23.5055 16.0006 23.871 16.152C24.2364 16.3034 24.5488 16.5597 24.7685 16.8886C24.9883 17.2175 25.1056 17.6042 25.1056 17.9998C25.1056 18.5302 24.8949 19.0389 24.5198 19.414C24.1447 19.789 23.636 19.9998 23.1056 19.9998Z" fill="#C45A32"/>
                        <path d="M2.10547 16.2153V9.99652C2.10547 8.64215 2.85547 6.37152 5.45859 5.87965C7.66797 5.46527 9.85547 5.46527 9.85547 5.46527C9.85547 5.46527 11.293 6.46527 10.1055 6.46527C8.91797 6.46527 8.94922 7.99652 10.1055 7.99652C11.2617 7.99652 10.1055 9.46527 10.1055 9.46527L5.44922 14.7465L2.10547 16.2153Z" fill="#C45A32"/>
                      </svg>
                    </div>
                  </div>

                  {/* CARD 2 - TODAY'S USERS */}
                  <div className="col-span-4 h-[80px] flex-shrink-0 rounded-[15px] bg-[#F8F8F8] shadow-[0_3.5px_5.5px_0_rgba(0,0,0,0.02)] flex items-center justify-between px-6">
                    
                    {/* Text Content */}
                    <div className="w-[91.472px] flex flex-col items-start gap-1">
                      <span className="w-[91px] h-[18px] text-[#A0AEC0] font-montserrat text-[12px] font-bold leading-[150%]">
                        Today's Users
                      </span>
                      <span className="w-[45.729px] h-[25px] text-[#2D3748] font-helvetica text-[18px] font-bold leading-[140%]">
                        {metrics?.totalUsers || '0'}
                      </span>
                      <span className="w-[28.643px] h-[19.5px] text-[#48BB78] font-helvetica text-[14px] font-bold leading-[140%]">
                        +2.3%
                      </span>
                    </div>

                    {/* Icon */}
                    <div className="w-[32px] h-[32px] flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="33" height="32" viewBox="0 0 33 32" fill="none">
                        <path d="M16.0253 2.99878C8.84589 2.99878 3.02527 8.8194 3.02527 15.9988C3.02527 23.1782 8.84589 28.9988 16.0253 28.9988C23.2046 28.9988 29.0253 23.1782 29.0253 15.9988C29.0253 8.8194 23.2046 2.99878 16.0253 2.99878Z" fill="#C45A32" stroke="white" strokeWidth="0.75" strokeMiterlimit="10"/>
                        <path d="M16.0251 2.99878C12.3958 2.99878 8.98328 8.8194 8.98328 15.9988C8.98328 23.1782 12.3958 28.9988 16.0251 28.9988C19.6545 28.9988 23.067 23.1782 23.067 15.9988C23.067 8.8194 19.6545 2.99878 16.0251 2.99878Z" fill="#C45A32" stroke="white" strokeWidth="0.75" strokeMiterlimit="10"/>
                        <path d="M7.35828 7.33224C9.74828 9.02912 12.757 10.041 16.0251 10.041C19.2933 10.041 22.302 9.02912 24.692 7.33224" fill="#C45A32"/>
                        <path d="M7.35828 7.33224C9.74828 9.02912 12.757 10.041 16.0251 10.041C19.2933 10.041 22.302 9.02912 24.692 7.33224" stroke="white" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M24.692 24.6676C22.302 22.9707 19.2933 21.9588 16.0251 21.9588C12.757 21.9588 9.74828 22.9707 7.35828 24.6676" stroke="white" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M16.0251 2.99878V28.9988" stroke="white" strokeWidth="0.75" strokeMiterlimit="10"/>
                        <path d="M29.0253 15.9985H3.02527" stroke="white" strokeWidth="0.75" strokeMiterlimit="10"/>
                      </svg>
                    </div>
                  </div>

                  {/* CARD 3 - NEW CLIENTS */}
                  <div className="col-span-4 h-[80px] flex-shrink-0 rounded-[15px] bg-[#F8F8F8] shadow-[0_3.5px_5.5px_0_rgba(0,0,0,0.02)] flex items-center justify-between px-6">
                    
                    {/* Text Content */}
                    <div className="w-[94.919px] flex flex-col items-start gap-1">
                      <span className="w-[88px] h-[18px] text-[#A0AEC0] font-montserrat text-[12px] font-bold leading-[150%]">
                        New Clients
                      </span>
                      <span className="w-[56.281px] h-[25px] text-[#2D3748] font-helvetica text-[18px] font-bold leading-[140%]">
                        {metrics?.totalBusinesses || '0'}
                      </span>
                      <span className="w-[33.166px] h-[19.5px] text-[#E53E3E] font-helvetica text-[14px] font-bold leading-[140%]">
                        -1.7%
                      </span>
                    </div>

                    {/* Icon */}
                    <div className="w-[32px] h-[32px] flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="33" height="32" viewBox="0 0 33 32" fill="none">
                        <path d="M9.94452 2.01202H15.6945C15.7577 2.01202 15.8188 2.03667 15.8635 2.08136C15.9082 2.12605 15.9328 2.18711 15.9328 2.25031V11.0003C15.9328 11.7991 16.2498 12.5654 16.8146 13.1302C17.3794 13.695 18.1458 14.012 18.9445 14.012H27.6945C27.7577 14.012 27.8188 14.0367 27.8635 14.0814C27.9081 14.126 27.9328 14.1871 27.9328 14.2503V26.0003C27.9328 27.0581 27.5128 28.0727 26.7648 28.8206C26.0169 29.5686 25.0023 29.9886 23.9445 29.9886H9.94452C8.88676 29.9886 7.87215 29.5686 7.12421 28.8206C6.37626 28.0727 5.95624 27.0581 5.95624 26.0003V6.00031C5.95624 4.94255 6.37626 3.92794 7.12421 3.17999C7.87215 2.43205 8.88676 2.01202 9.94452 2.01202ZM11.9445 21.9886C11.6762 21.9886 11.4184 22.0948 11.2287 22.2845C11.039 22.4742 10.9328 22.732 10.9328 23.0003C10.9328 23.2686 11.039 23.5264 11.2287 23.7161C11.4184 23.9059 11.6762 24.012 11.9445 24.012H21.9445C22.2128 24.012 22.4706 23.9059 22.6603 23.7161C22.8501 23.5264 22.9562 23.2686 22.9562 23.0003C22.9562 22.732 22.8501 22.4742 22.6603 22.2845C22.4706 22.0948 22.2128 21.9886 21.9445 21.9886H11.9445ZM11.9445 16.9886C11.6762 16.9886 11.4184 17.0948 11.2287 17.2845C11.039 17.4742 10.9328 17.732 10.9328 18.0003C10.9328 18.2686 11.039 18.5264 11.2287 18.7161C11.4184 18.9059 11.6762 19.012 11.9445 19.012H21.9445C22.2128 19.012 22.4706 18.9059 22.6603 18.7161C22.8501 18.5264 22.9562 18.2686 22.9562 18.0003C22.9562 17.732 22.8501 17.4742 22.6603 17.2845C22.4706 17.0948 22.2128 16.9886 21.9445 16.9886H11.9445Z" fill="#C45A32" stroke="#C45A32" strokeWidth="0.0234375"/>
                        <path d="M18.0909 2.77792C18.1129 2.78226 18.1337 2.79343 18.1495 2.80917L27.1378 11.7975C27.1533 11.8132 27.1638 11.8334 27.1681 11.8551C27.1724 11.8769 27.1698 11.8999 27.1613 11.9205C27.1527 11.9409 27.1386 11.9589 27.1202 11.9713C27.1018 11.9836 27.0799 11.9897 27.0577 11.9898H18.9445C18.6823 11.9898 18.4306 11.8861 18.2452 11.7008C18.06 11.5155 17.9562 11.2636 17.9562 11.0016V2.88925C17.9563 2.86692 17.9633 2.84432 17.9757 2.82578C17.9881 2.8074 18.006 2.79324 18.0265 2.78476C18.0469 2.77636 18.0693 2.77374 18.0909 2.77792Z" fill="#C45A32" stroke="#C45A32" strokeWidth="0.0234375"/>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* TRANSACTIONS + DAILY ACTIVITIES + YEARLY UPDATES SIDE-BY-SIDE */}
                <div className="col-span-12 flex gap-6">
                  
                  {/* Daily Activities */}
                  <div className="col-span-4 h-[456px] flex-shrink-0 rounded-[12px] bg-white shadow-[0_0_2px_0_rgba(145,158,171,0.20),0_12px_24px_-4px_rgba(145,158,171,0.12)]">
                    <DailyActivities 
                      payments={payments} 
                      users={users} 
                      loading={loading} 
                    />
                  </div>

                  {/* Yearly Updates */}
                  <div className="col-span-4 h-[411px] flex-shrink-0 rounded-[12px] bg-white shadow-[0_0_2px_0_rgba(145,158,171,0.20),0_12px_24px_-4px_rgba(145,158,171,0.12)]">
                    <YearlyUpdates 
                      payments={payments} 
                      loading={loading} 
                    />
                  </div>
                </div>
              </MainLayout>
            )}

            {/* BASE DE DATOS DE USUARIOS */}
            {activeSection === 'users' && (
              <MainLayout>
                <div className="col-span-12">
                  <div className="flex justify-between items-center mb-6 w-full">
                    <h2 className="text-2xl font-bold">Usuarios Registrados ({users.length})</h2>
                    <button 
                      onClick={refetch} 
                      className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
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
            {activeSection === 'businesses' && (
              <MainLayout>
                <div className="col-span-12">
                  <BusinessDB 
                    businesses={businesses} 
                    loading={loading} 
                    onRefresh={refetch} 
                  />
                </div>
              </MainLayout>
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
                <div className="col-span-12">
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
              <MainLayout className="space-y-6">
                <div className="col-span-12">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-2">Site Traffic Insights</h2>
                  <p className="text-gray-600 text-base">
                    Métricas de tráfico en tiempo real - {metrics?.totalVisits || 0} visitas registradas
                  </p>
                </div>

                {/* Métricas rápidas */}
                <div className="col-span-12 grid grid-cols-1 md:grid-cols-4 gap-4">
                  {/* Total de visitas */}
                  <div className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500">
                    <h3 className="text-base font-medium text-gray-700 mb-1">Total Visitas</h3>
                    <p className="text-2xl font-bold text-gray-900">{metrics?.totalVisits || 0}</p>
                    <p className="text-xs text-gray-500 mt-1">Registros totales</p>
                  </div>

                  {/* Visitantes únicos */}
                  <div className="bg-white rounded-lg shadow p-4 border-l-4 border-green-500">
                    <h3 className="text-base font-medium text-gray-700 mb-1">Visitantes Únicos</h3>
                    <p className="text-2xl font-bold text-gray-900">{metrics?.uniqueVisitors || 0}</p>
                    <p className="text-xs text-gray-500 mt-1">IPs distintas</p>
                  </div>

                  {/* Dispositivo principal */}
                  <div className="bg-white rounded-lg shadow p-4 border-l-4 border-purple-500">
                    <h3 className="text-base font-medium text-gray-700 mb-1">Dispositivo Principal</h3>
                    <p className="text-2xl font-bold text-gray-900">
                      {metrics?.devicesUsage?.[0]?.device || 'N/A'}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {metrics?.devicesUsage?.[0]?.count || 0} visitas
                    </p>
                  </div>

                  {/* Navegador principal */}
                  <div className="bg-white rounded-lg shadow p-4 border-l-4 border-orange-500">
                    <h3 className="text-base font-medium text-gray-700 mb-1">Navegador Principal</h3>
                    <p className="text-2xl font-bold text-gray-900">
                      {metrics?.browsers?.[0]?.browser || 'N/A'}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {metrics?.browsers?.[0]?.count || 0} visitas
                    </p>
                  </div>
                </div>

                <div className="col-span-12 grid grid-cols-1 2xl:grid-cols-2 gap-8">
                  {/* Gráfico de visitas mensuales REALES */}
                  <ChartSection title="Visitas por Mes" loading={loading}>
                    {metrics?.visitsByMonth?.length > 0 ? (
                      <ResponsiveContainer width="100%" height={325}>
                        <LineChart data={metrics.visitsByMonth}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis 
                            dataKey="month" 
                            angle={-45}
                            textAnchor="end"
                            height={80}
                            tick={{ fontSize: 12 }}
                          />
                          <YAxis />
                          <Tooltip 
                            formatter={(value) => [`${value} visitas`, 'Visitas']}
                            labelFormatter={(label) => `Mes: ${label}`}
                          />
                          <Legend />
                          <Line 
                            type="monotone" 
                            dataKey="count" 
                            stroke="#3b82f6" 
                            strokeWidth={2}
                            name="Visitas"
                            dot={{ fill: '#3b82f6', r: 4 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="flex items-center justify-center h-40">
                        <p className="text-gray-600">No hay datos de visitas disponibles</p>
                      </div>
                    )}
                  </ChartSection>

                  {/* Gráfico de dispositivos REALES */}
                  <ChartSection title="Dispositivos de Acceso" loading={loading}>
                    {metrics?.devicesUsage?.length > 0 ? (
                      <ResponsiveContainer width="100%" height={325}>
                        <BarChart data={metrics.devicesUsage}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis 
                            dataKey="device" 
                            type="category" 
                            interval={0} 
                            tick={{ fontSize: 12 }} 
                          />
                          <YAxis />
                          <Tooltip 
                            formatter={(value) => [`${value} visitas`, 'Visitas']}
                          />
                          <Legend />
                          <Bar 
                            dataKey="count" 
                            fill="#10b981" 
                            name="Visitas"
                            radius={[4, 4, 0, 0]}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="flex items-center justify-center h-40">
                        <p className="text-gray-600">No hay datos de dispositivos disponibles</p>
                      </div>
                    )}
                  </ChartSection>
                </div>

                {/* Gráficos adicionales */}
                <div className="col-span-12 grid grid-cols-1 2xl:grid-cols-2 gap-8">
                  {/* Gráfico de navegadores */}
                  <ChartSection title="Navegadores Más Usados" loading={loading}>
                    {metrics?.browsers?.length > 0 ? (
                      <ResponsiveContainer width="100%" height={325}>
                        <BarChart data={metrics.browsers}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis 
                            dataKey="browser" 
                            type="category" 
                            interval={0} 
                            tick={{ fontSize: 12 }} 
                          />
                          <YAxis />
                          <Tooltip 
                            formatter={(value) => [`${value} visitas`, 'Visitas']}
                          />
                          <Legend />
                          <Bar 
                            dataKey="count" 
                            fill="#f59e0b" 
                            name="Visitas"
                            radius={[4, 4, 0, 0]}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="flex items-center justify-center h-40">
                        <p className="text-gray-600">No hay datos de navegadores disponibles</p>
                      </div>
                    )}
                  </ChartSection>

                  {/* Gráfico de sistemas operativos */}
                  <ChartSection title="Sistemas Operativos" loading={loading}>
                    {metrics?.operatingSystems?.length > 0 ? (
                      <ResponsiveContainer width="100%" height={325}>
                        <PieChart>
                          <Pie
                            data={metrics.operatingSystems}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ os, count }) => `${os}: ${count}`}
                            outerRadius={120}
                            fill="#8884d8"
                            dataKey="count"
                            nameKey="os"
                          >
                            {metrics.operatingSystems.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'][index % 5]} />
                            ))}
                          </Pie>
                          <Tooltip 
                            formatter={(value) => [`${value} visitas`, 'Visitas']}
                          />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="flex items-center justify-center h-40">
                        <p className="text-gray-600">No hay datos de sistemas operativos disponibles</p>
                      </div>
                    )}
                  </ChartSection>
                </div>

                {/* Tabla de tráfico con datos REALES */}
                <div className="col-span-12">
                  <TrafficTable 
                    trafficData={[
                      ...(metrics?.visitsByMonth || []), 
                      ...(metrics?.devicesUsage || [])
                    ]} 
                    loading={loading} 
                  />
                </div>

                {/* Información del sistema */}
                <div className="col-span-12 bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <div className="text-blue-500 mr-3 mt-1">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-blue-800 font-medium">Sistema de Tracking Activo</p>
                      <p className="text-blue-600 text-sm">
                        Estos datos se actualizan automáticamente con cada dispositivo que se conecta a tu aplicación.
                        {metrics?.totalVisits && ` ${metrics.totalVisits} registros capturados.`}
                        {metrics?.uniqueVisitors && ` ${metrics.uniqueVisitors} visitantes únicos.`}
                      </p>
                      <p className="text-blue-500 text-xs mt-1">
                        Última actualización: {new Date().toLocaleString()}
                      </p>
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