// src/components/dashboard/SalesRevenue.jsx
import { useState, useMemo, useEffect } from 'react';
import { 
  Search, Filter, Download, DollarSign, TrendingUp, CheckCircle, 
  XCircle, Clock, BarChart3, FileText, RefreshCw 
} from 'lucide-react';
import {
  LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend,
  ResponsiveContainer
} from 'recharts';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip as ChartTooltip,
  Legend as ChartLegend,
  Filler
} from 'chart.js';
import { Line as ChartLine } from 'react-chartjs-2';

// 🔧 REGISTRAR COMPONENTES DE CHART.JS
ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement, 
  Title, ChartTooltip, ChartLegend, Filler
);

const SalesRevenue = ({ payments = [], businesses = [], users = [], loading, onRefresh }) => {
  // 📊 ESTADOS UNIFICADOS
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dateRange, setDateRange] = useState('month');
  const [currentPage, setCurrentPage] = useState(1);
  const [salesTrends, setSalesTrends] = useState([]);
  const [isReconciling, setIsReconciling] = useState({});
  
  // 📈 ESTADOS DE GRÁFICOS
  const [revenueChartData, setRevenueChartData] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [revenueStats, setRevenueStats] = useState({ current: 0, previous: 0, growth: 0 });
  const [profitChartData, setProfitChartData] = useState(null);
  const [totalEarnings, setTotalEarnings] = useState(0);
  
  // 💰 ESTADOS DE TRANSACCIONES
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [transactionStats, setTransactionStats] = useState({ income: 0, expense: 0, net: 0 });

  const itemsPerPage = 10;
  const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  // 🎯 USE EFFECTS CONSOLIDADOS
  useEffect(() => {
    if (payments.length > 0 && businesses.length > 0) {
      loadSalesTrends();
      loadRevenueChartData();
      loadProfitChartData();
      loadRecentTransactions();
    }
  }, [payments, businesses, dateRange, selectedMonth]);

  // 📊 FUNCIÓN: Cargar tendencias de ventas principales
  const loadSalesTrends = async () => {
    try {
      const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
      const currentYear = new Date().getFullYear();
      const previousYear = currentYear - 1;

      const currentYearData = months.map((month, index) => {
        const monthPayments = payments.filter(payment => {
          const paymentDate = new Date(payment.createdAt);
          return paymentDate.getFullYear() === currentYear && 
                 paymentDate.getMonth() === index &&
                 payment.status === 'Completed';
        });
        const totalAmount = monthPayments.reduce((sum, p) => sum + p.amount, 0);
        return { month, actual: totalAmount, previous: 0 };
      });

      const previousYearData = months.map((month, index) => {
        const monthPayments = payments.filter(payment => {
          const paymentDate = new Date(payment.createdAt);
          return paymentDate.getFullYear() === previousYear && 
                 paymentDate.getMonth() === index &&
                 payment.status === 'Completed';
        });
        return monthPayments.reduce((sum, p) => sum + p.amount, 0);
      });

      const chartData = currentYearData.map((item, index) => ({
        ...item,
        previous: previousYearData[index] || 0
      }));

      setSalesTrends(chartData);
    } catch (error) {
      console.error('Error loading sales trends:', error);
    }
  };

  // 📈 FUNCIÓN: Cargar datos del gráfico de revenue
  const loadRevenueChartData = () => {
    const completedPayments = payments.filter(p => p.status === 'Completed');
    const now = new Date();
    const selectedYear = now.getFullYear();
    const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();

    let labels = Array.from({ length: daysInMonth }, (_, i) => String(i + 1));
    let dailyRevenue = Array(daysInMonth).fill(0);

    if (completedPayments.length === 0) {
      generateSampleRevenueData(labels);
      return;
    }

    completedPayments.forEach(payment => {
      const date = new Date(payment.payment_date || payment.createdAt);
      if (date.getMonth() === selectedMonth && date.getFullYear() === selectedYear) {
        const day = date.getDate() - 1;
        dailyRevenue[day] += payment.amount;
      }
    });

    const totalRevenue = dailyRevenue.reduce((a, b) => a + b, 0);
    const previousMonthRevenue = 15000;
    const growth = previousMonthRevenue > 0 ? ((totalRevenue - previousMonthRevenue) / previousMonthRevenue) * 100 : 0;

    setRevenueStats({ current: totalRevenue, previous: previousMonthRevenue, growth });

    setRevenueChartData({
      labels,
      datasets: [{
        label: `Revenue ${monthNames[selectedMonth]}`,
        data: dailyRevenue,
        borderColor: '#C45A32',
        backgroundColor: 'rgba(196, 90, 50, 0.1)',
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#C45A32',
        pointBorderColor: '#FFF',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      }]
    });
  };

  // 💰 FUNCIÓN: Cargar datos del gráfico de profit
  const loadProfitChartData = () => {
    const filtered = payments.filter(
      (p) => (p.status === "Completed" || p.status === "COMPLETED") &&
             new Date(p.payment_date || p.createdAt).getFullYear() >= 2025
    );

    const profitByYear = {};
    filtered.forEach((p) => {
      const year = new Date(p.payment_date || p.createdAt).getFullYear();
      profitByYear[year] = (profitByYear[year] || 0) + parseFloat(p.amount);
    });

    const allYears = Array.from({ length: 6 }, (_, i) => 2025 + i);
    const profits = allYears.map((year) => profitByYear[year] || 0);
    const total = profits.reduce((a, b) => a + b, 0);
    
    setTotalEarnings(total);
    setProfitChartData({
      labels: allYears,
      datasets: [{
        label: "Total Profit",
        data: profits,
        borderColor: "#5B6EFF",
        backgroundColor: (ctx) => {
          const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(0, "rgba(91,110,255,0.3)");
          gradient.addColorStop(1, "rgba(91,110,255,0)");
          return gradient;
        },
        tension: 0.4,
        fill: true,
        pointBackgroundColor: "#5B6EFF",
        pointRadius: 5,
      }]
    });
  };

  // 💳 FUNCIÓN: Cargar transacciones recientes
  const loadRecentTransactions = () => {
    const recent = payments
      .slice(0, 4)
      .map(payment => ({
        id: payment.id,
        type: 'Payment Received',
        amount: payment.amount,
        description: `Payment from ${users.find(u => u.id === payment.userId)?.name || 'Customer'}`,
        date: new Date(payment.createdAt),
        isPositive: payment.status === 'Completed',
        status: payment.status
      }));

    if (recent.length < 4) {
      const exampleTransactions = [
        { id: 1, type: 'PayPal Transfer', amount: 120.5, description: 'Payment received', date: new Date('2025-10-08T10:15:00'), isPositive: true, status: 'Completed' },
        { id: 2, type: 'Bank Transfer', amount: 65.0, description: 'Bill payment', date: new Date('2025-10-07T14:32:00'), isPositive: false, status: 'Failed' },
        { id: 3, type: 'Credit Card', amount: 230.25, description: 'Sale completed', date: new Date('2025-10-06T18:47:00'), isPositive: true, status: 'Completed' },
        { id: 4, type: 'Wallet', amount: 45.75, description: 'Subscription', date: new Date('2025-10-05T12:23:00'), isPositive: false, status: 'Pending' }
      ];
      setRecentTransactions(exampleTransactions);

      const totalIncome = exampleTransactions.filter(t => t.isPositive).reduce((sum, t) => sum + t.amount, 0);
      const totalExpense = exampleTransactions.filter(t => !t.isPositive).reduce((sum, t) => sum + t.amount, 0);
      setTransactionStats({ income: totalIncome, expense: totalExpense, net: totalIncome - totalExpense });
    } else {
      setRecentTransactions(recent);
      const totalIncome = recent.filter(t => t.isPositive).reduce((sum, t) => sum + t.amount, 0);
      const totalExpense = recent.filter(t => !t.isPositive).reduce((sum, t) => sum + t.amount, 0);
      setTransactionStats({ income: totalIncome, expense: totalExpense, net: totalIncome - totalExpense });
    }
  };

  // 🎲 FUNCIÓN: Datos de ejemplo para revenue
  const generateSampleRevenueData = (labels) => {
    const baseRevenue = 12000;
    const sampleData = labels.map(() => Math.random() * (800 - 200) + 200);
    
    setRevenueChartData({
      labels,
      datasets: [{
        label: `Revenue ${monthNames[selectedMonth]}`,
        data: sampleData,
        borderColor: '#C45A32',
        backgroundColor: 'rgba(196, 90, 50, 0.1)',
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#C45A32',
        pointBorderColor: '#FFF',
        pointBorderWidth: 2,
        pointRadius: 4,
      }]
    });

    setRevenueStats({ current: sampleData.reduce((a, b) => a + b, 0), previous: 9000, growth: 10.2 });
  };

  // 🔍 FUNCIÓN: Filtrar transacciones (del SalesRevenue original)
  const filteredPayments = useMemo(() => {
    return payments.filter(payment => {
      const user = users.find(u => u.id === payment.userId);
      const business = businesses.find(b => b.id === payment.businessId);
      const matchesSearch = 
        payment.id?.toString().includes(searchTerm) ||
        user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        business?.businessName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.amount?.toString().includes(searchTerm);
      const matchesStatus = !statusFilter || payment.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [payments, users, businesses, searchTerm, statusFilter]);

  // 📄 FUNCIÓN: Paginación
  const paginatedPayments = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredPayments.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredPayments, currentPage]);

  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);

  // 📈 FUNCIÓN: Calcular KPIs principales
  const kpis = useMemo(() => {
    const completedPayments = payments.filter(p => p.status === 'Completed');
    const totalGMV = completedPayments.reduce((sum, p) => sum + p.amount, 0);
    const totalCommission = completedPayments.reduce((sum, p) => sum + p.amount * 0.15, 0);

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const currentMonthPayments = completedPayments.filter(p => {
      const paymentDate = new Date(p.createdAt);
      return paymentDate.getMonth() === currentMonth && paymentDate.getFullYear() === currentYear;
    });
    const previousMonthPayments = completedPayments.filter(p => {
      const paymentDate = new Date(p.createdAt);
      const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
      const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
      return paymentDate.getMonth() === prevMonth && paymentDate.getFullYear() === prevYear;
    });
    const currentMonthGMV = currentMonthPayments.reduce((sum, p) => sum + p.amount, 0);
    const previousMonthGMV = previousMonthPayments.reduce((sum, p) => sum + p.amount, 0);
    const growthRate = previousMonthGMV > 0 ? ((currentMonthGMV - previousMonthGMV) / previousMonthGMV) * 100 : currentMonthGMV > 0 ? 100 : 0;

    return {
      totalGMV,
      netRevenue: totalCommission,
      growthRate: Math.round(growthRate * 100) / 100,
      totalTransactions: payments.length,
      completedTransactions: completedPayments.length,
      pendingPayments: payments.filter(p => p.status === 'Pending').length,
      failedPayments: payments.filter(p => p.status === 'Failed').length,
      currentMonthGMV,
      previousMonthGMV
    };
  }, [payments]);

  // 🤝 FUNCIÓN: Estadísticas de conciliación
  const reconciliationStats = useMemo(() => {
    const reconciledBusinesses = businesses.filter(b => payments.some(p => p.businessId === b.id && p.status === 'Completed')).length;
    return {
      totalBusinesses: businesses.length,
      reconciled: reconciledBusinesses,
      pendingReconciliation: businesses.length - reconciledBusinesses,
      reconciliationRate: businesses.length > 0 ? (reconciledBusinesses / businesses.length) * 100 : 0
    };
  }, [businesses, payments]);

  // 💸 FUNCIÓN: Conciliar pago
  const handleReconcilePayment = async (paymentId) => {
    try {
      setIsReconciling(prev => ({ ...prev, [paymentId]: true }));
      const response = await fetch('/api/payments/reconcile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paymentId }),
      });
      if (response.ok) onRefresh();
      else alert('Error al conciliar el pago.');
    } catch (error) {
      console.error(error);
      alert('Error de conexión.');
    } finally {
      setIsReconciling(prev => ({ ...prev, [paymentId]: false }));
    }
  };

  // 📊 FUNCIÓN: Generar reporte fiscal
  const handleGenerateReport = async () => {
    try {
      const response = await fetch('/api/reports/fiscal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dateRange,
          businessIds: businesses.map(b => b.id),
          startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString(),
          endDate: new Date().toISOString()
        }),
      });
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `reporte-fiscal-${new Date().toISOString().split('T')[0]}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        alert('Reporte generado exitosamente');
      } else alert('Error al generar el reporte');
    } catch (error) {
      console.error(error);
      alert('Error de conexión al generar reporte');
    }
  };

  // 💾 FUNCIÓN: Exportar datos
  const handleExportData = async () => {
    try {
      const exportData = {
        kpis,
        payments: filteredPayments.map(p => ({
          id: p.id,
          amount: p.amount,
          status: p.status,
          createdAt: p.createdAt,
          user: users.find(u => u.id === p.userId)?.name || 'N/A',
          business: businesses.find(b => b.id === p.businessId)?.businessName || 'N/A',
          commission: p.amount * 0.15
        })),
        reconciliation: reconciliationStats,
        generatedAt: new Date().toISOString(),
      };
      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `datos-ventas-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      alert('Datos exportados exitosamente');
    } catch (error) {
      console.error(error);
      alert('Error al exportar datos');
    }
  };

  // 🔧 FUNCIONES UTILITARIAS
  const formatCurrency = (amount) => new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', minimumFractionDigits: 2 }).format(amount || 0);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return { bg: 'bg-green-100 dark:bg-green-900', text: 'text-green-800 dark:text-green-200', icon: CheckCircle };
      case 'Pending': return { bg: 'bg-yellow-100 dark:bg-yellow-900', text: 'text-yellow-800 dark:text-yellow-200', icon: Clock };
      case 'Failed': return { bg: 'bg-red-100 dark:bg-red-900', text: 'text-red-800 dark:text-red-200', icon: XCircle };
      default: return { bg: 'bg-gray-100 dark:bg-gray-700', text: 'text-gray-800 dark:text-gray-200', icon: Clock };
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'Completed': return 'Completado';
      case 'Pending': return 'Pendiente';
      case 'Failed': return 'Fallido';
      default: return status;
    }
  };

  const getTransactionStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'text-green-600 dark:text-green-400';
      case 'Failed': return 'text-red-600 dark:text-red-400';
      default: return 'text-yellow-600 dark:text-yellow-400';
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // 🎨 RENDERIZADO
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <span className="ml-3 text-gray-600 dark:text-gray-400">Cargando datos de ventas...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8 w-full">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Sales & Revenue</h2>
          <p className="text-gray-600 dark:text-gray-400">Visión financiera y gestión de pagos a negocios</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={onRefresh}
            className="bg-blue-500 dark:bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors duration-200 font-medium flex items-center gap-2 disabled:opacity-50"
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            {loading ? 'Actualizando...' : 'Actualizar'}
          </button>
          <button 
            onClick={handleGenerateReport}
            className="bg-green-500 dark:bg-green-600 text-white px-5 py-2.5 rounded-lg hover:bg-green-600 dark:hover:bg-green-700 transition-colors duration-200 font-medium flex items-center gap-2"
          >
            <FileText className="h-4 w-4" />
            Reporte Fiscal
          </button>
        </div>
      </div>

      {/* KPIs PRINCIPALES */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <DollarSign className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <span className={`text-sm font-medium ${
              kpis.growthRate >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
            }`}>
              {kpis.growthRate >= 0 ? '+' : ''}{kpis.growthRate.toFixed(1)}%
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
            {formatCurrency(kpis.totalGMV)}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Ingresos Totales (GMV)</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
              <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <span className="text-sm font-medium text-green-600 dark:text-green-400">Neto</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
            {formatCurrency(kpis.netRevenue)}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Comisión Neta (15%)</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <BarChart3 className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
              {kpis.totalTransactions}
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
            {kpis.completedTransactions}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Transacciones Completadas</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
              <CheckCircle className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
            <span className="text-sm font-medium text-orange-600 dark:text-orange-400">
              {reconciliationStats.reconciliationRate.toFixed(1)}%
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
            {reconciliationStats.reconciled}/{reconciliationStats.totalBusinesses}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Negocios Conciliados</p>
        </div>
      </div>

      {/* SECCIÓN: GRÁFICOS CONSOLIDADOS */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        
        {/* 📈 GRÁFICO REVENUE CHART */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-300">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Revenue por Mes</h3>
              <p className="text-gray-600 dark:text-gray-400">Ganancias diarias del mes</p>
            </div>
            <select 
              value={selectedMonth} 
              onChange={(e) => setSelectedMonth(Number(e.target.value))} 
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200"
            >
              {monthNames.map((month, index) => (
                <option key={index} value={index}>{month}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-6 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#C45A32]"></div>
              <span className="text-gray-600 dark:text-gray-400 text-sm">
                Actual: ${revenueStats.current.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div className={`flex items-center gap-1 ${revenueStats.growth >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor">
                <path d={revenueStats.growth >= 0
                  ? "M8 4L12 8H9V12H7V8H4L8 4Z"
                  : "M8 12L4 8H7V4H9V8H12L8 12Z"} />
              </svg>
              <span className="text-sm font-semibold">
                {revenueStats.growth >= 0 ? '+' : ''}{revenueStats.growth.toFixed(1)}%
              </span>
            </div>
          </div>

          <div className="h-64">
            {revenueChartData ? (
              <ChartLine 
                data={revenueChartData} 
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { display: false } },
                  scales: {
                    x: { 
                      grid: { display: false }, 
                      ticks: { 
                        color: '#7C8FAC', 
                        font: { size: 11 },
                        maxRotation: 0,
                        autoSkip: true,
                        maxTicksLimit: 10
                      } 
                    },
                    y: { 
                      beginAtZero: true, 
                      grid: { color: 'rgba(145,158,171,0.2)' },
                      ticks: { 
                        color: '#7C8FAC',
                        callback: (value) => {
                          if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
                          if (value >= 1000) return `$${(value / 1000).toFixed(0)}k`;
                          return `$${value}`;
                        },
                        font: { size: 11 }
                      }
                    }
                  }
                }} 
              />
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                No hay datos disponibles
              </div>
            )}
          </div>
        </div>

        {/* 💰 GRÁFICO TOTAL PROFIT */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-300">
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Total Profit</h3>
            <p className="text-2xl font-bold text-[#5B6EFF]">
              ${totalEarnings.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </p>
            <p className="text-gray-600 dark:text-gray-400">Total Earnings (2025–2030)</p>
          </div>
          <div className="h-64">
            {profitChartData ? (
              <ChartLine 
                data={profitChartData} 
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { display: false } },
                  scales: {
                    y: { 
                      beginAtZero: true, 
                      ticks: { 
                        callback: (v) => `$${v.toLocaleString()}` 
                      } 
                    },
                    x: { grid: { display: false } }
                  }
                }} 
              />
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                Cargando datos de profit...
              </div>
            )}
          </div>
        </div>
      </div>

      {/* GRÁFICO DE TENDENCIAS DE VENTAS */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-300">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Tendencia de Ventas</h3>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200"
          >
            <option value="month">Último Mes</option>
            <option value="quarter">Último Trimestre</option>
            <option value="year">Último Año</option>
          </select>
        </div>
        <div className="h-80">
          {salesTrends.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis tickFormatter={(value) => formatCurrency(value)} stroke="#9CA3AF" />
                <Tooltip 
                  formatter={(value) => [formatCurrency(value), 'Monto']}
                  contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', color: '#F9FAFB' }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="actual" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  name="Período Actual"
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="previous" 
                  stroke="#94a3b8" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="Período Anterior"
                  dot={{ fill: '#94a3b8', strokeWidth: 2, r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex justify-center items-center h-full text-gray-500 dark:text-gray-400">
              No hay datos suficientes para mostrar el gráfico
            </div>
          )}
        </div>
      </div>

      {/* SECCIÓN: TRANSACCIONES RECIENTES */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-300">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Recent Transactions</h3>
            <p className="text-gray-600 dark:text-gray-400">Income vs Expense</p>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg transition-colors duration-300">
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Income</p>
            <p className="text-lg text-green-600 dark:text-green-400 font-semibold">+${transactionStats.income.toLocaleString()}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Expense</p>
            <p className="text-lg text-red-600 dark:text-red-400 font-semibold">-${transactionStats.expense.toLocaleString()}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Net</p>
            <p className={`text-lg font-semibold ${transactionStats.net >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {transactionStats.net >= 0 ? '+' : ''}${transactionStats.net.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Transactions List */}
        <div className="space-y-3 mb-6 max-h-80 overflow-y-auto">
          {recentTransactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  transaction.isPositive ? 'bg-green-50 dark:bg-green-900' : 'bg-red-50 dark:bg-red-900'
                }`}>
                  <span className={`text-sm ${transaction.isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {transaction.type.includes('PayPal') ? '🏦' :
                     transaction.type.includes('Bank') ? '💳' :
                     transaction.type.includes('Credit') ? '💠' :
                     transaction.type.includes('Wallet') ? '👛' : '💰'}
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium text-gray-800 dark:text-white">{transaction.type}</p>
                    <span className={`text-xs px-1 py-0.5 rounded ${getTransactionStatusColor(transaction.status)}`}>
                      {transaction.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{transaction.description}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">{formatDate(transaction.date)}</p>
                </div>
              </div>
              <div className={`font-semibold ${transaction.isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {transaction.isPositive ? '+' : '-'}${transaction.amount.toLocaleString()}
              </div>
            </div>
          ))}
        </div>

        <button className="w-full h-10 flex items-center justify-center gap-2 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200">
          <span className="text-sm font-semibold text-gray-800 dark:text-white">View all transactions</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none">
            <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* GESTIÓN DE TRANSACCIONES COMPLETAS */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors duration-300">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Gestión de Transacciones</h3>
              <p className="text-gray-600 dark:text-gray-400">Listado detallado de reservas y compras</p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={handleExportData}
                className="bg-gray-500 dark:bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-600 dark:hover:bg-gray-700 transition-colors duration-200 flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Exportar
              </button>
            </div>
          </div>

          {/* Filtros */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Buscar por ID, cliente, negocio o monto..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200"
            >
              <option value="">Todos los estados</option>
              <option value="Completed">Completados</option>
              <option value="Pending">Pendientes</option>
              <option value="Failed">Fallidos</option>
            </select>

            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Mostrando {paginatedPayments.length} de {filteredPayments.length} transacciones
              </p>
            </div>
          </div>
        </div>

        {/* Tabla de transacciones */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Fecha</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Cliente</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Negocio</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Monto</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Comisión</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {paginatedPayments.length > 0 ? (
                paginatedPayments.map((payment) => {
                  const commission = payment.amount * 0.15;
                  const business = businesses.find(b => b.id === payment.businessId);
                  const user = users.find(u => u.id === payment.userId);
                  const statusConfig = getStatusColor(payment.status);
                  const StatusIcon = statusConfig.icon;

                  return (
                    <tr key={payment.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">#{payment.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {payment.createdAt ? new Date(payment.createdAt).toLocaleDateString('es-ES', {
                          year: 'numeric', month: '2-digit', day: '2-digit'
                        }) : 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {user?.name || 'Cliente no encontrado'}
                        {user?.email && <div className="text-xs text-gray-500 dark:text-gray-400">{user.email}</div>}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {business?.businessName || 'Negocio no encontrado'}
                        {business?.businessEmail && <div className="text-xs text-gray-500 dark:text-gray-400">{business.businessEmail}</div>}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 dark:text-white">
                        {formatCurrency(payment.amount)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 dark:text-green-400 font-semibold">
                        {formatCurrency(commission)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusConfig.bg} ${statusConfig.text}`}>
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {getStatusText(payment.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {payment.status === 'Completed' ? (
                          <button
                            onClick={() => handleReconcilePayment(payment.id)}
                            disabled={isReconciling[payment.id]}
                            className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 transition-colors duration-200"
                          >
                            {isReconciling[payment.id] ? (
                              <>
                                <RefreshCw className="h-3 w-3 animate-spin" />
                                Conciliando...
                              </>
                            ) : (
                              'Conciliar'
                            )}
                          </button>
                        ) : (
                          <span className="text-gray-400 dark:text-gray-500 text-xs">No aplica</span>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="8" className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                    {filteredPayments.length === 0 && payments.length > 0 ? 
                      'No se encontraron transacciones que coincidan con los filtros' : 
                      'No hay transacciones disponibles'
                    }
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        {totalPages > 1 && (
          <div className="bg-white dark:bg-gray-800 px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 sm:px-6 transition-colors duration-300">
            <div className="flex justify-between sm:justify-end w-full">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                Anterior
              </button>
              <div className="flex items-center mx-4">
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Página <span className="font-medium">{currentPage}</span> de <span className="font-medium">{totalPages}</span>
                </span>
              </div>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                Siguiente
              </button>
            </div>
          </div>
        )}
      </div>

      {/* CONCILIACIÓN DE PAGOS */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-300">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Conciliación de Pagos</h3>
            <p className="text-gray-600 dark:text-gray-400">Estado de pagos a negocios afiliados</p>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${
              reconciliationStats.reconciliationRate >= 80 ? 'bg-green-500' :
              reconciliationStats.reconciliationRate >= 50 ? 'bg-yellow-500' : 'bg-red-500'
            }`}></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {reconciliationStats.reconciliationRate.toFixed(1)}% Conciliado
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-800 rounded-lg p-4 transition-colors duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-700 dark:text-green-300 font-medium">Completados</p>
                <p className="text-2xl font-bold text-green-800 dark:text-green-200">{reconciliationStats.reconciled}</p>
                <p className="text-xs text-green-600 dark:text-green-400 mt-1">Negocios con pagos</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 transition-colors duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-yellow-700 dark:text-yellow-300 font-medium">Pendientes</p>
                <p className="text-2xl font-bold text-yellow-800 dark:text-yellow-200">{reconciliationStats.pendingReconciliation}</p>
                <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">Por conciliar</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-800 rounded-lg p-4 transition-colors duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-700 dark:text-blue-300 font-medium">Total Negocios</p>
                <p className="text-2xl font-bold text-blue-800 dark:text-blue-200">{reconciliationStats.totalBusinesses}</p>
                <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">Afiliados activos</p>
              </div>
              <Filter className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        {/* Barra de progreso */}
        <div className="mt-6">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
            <span>Progreso de conciliación</span>
            <span>{reconciliationStats.reconciliationRate.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${
                reconciliationStats.reconciliationRate >= 80 ? 'bg-green-500' :
                reconciliationStats.reconciliationRate >= 50 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${Math.min(reconciliationStats.reconciliationRate, 100)}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesRevenue;