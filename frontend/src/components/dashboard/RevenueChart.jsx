import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { useState, useEffect } from 'react';

// Registrar componentes de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const RevenueChart = ({ payments }) => {
  const [selectedMonth, setSelectedMonth] = useState('All Months');
  const [monthlyRevenue, setMonthlyRevenue] = useState({});
  const [chartData, setChartData] = useState({ labels: [], data: [] });

  // Procesar datos reales de pagos
  useEffect(() => {
    if (payments && payments.length > 0) {
      const revenueByMonth = {};
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      
      // Inicializar todos los meses con 0
      months.forEach(month => {
        revenueByMonth[month] = 0;
      });

      // Procesar pagos completados
      const completedPayments = payments.filter(p => p.status === 'Completed');
      
      completedPayments.forEach(payment => {
        const date = new Date(payment.date || payment.createdAt);
        const monthIndex = date.getMonth();
        const monthName = months[monthIndex];
        
        revenueByMonth[monthName] += payment.amount;
      });

      setMonthlyRevenue(revenueByMonth);
      
      // Configurar datos del gráfico
      const labels = months;
      const data = months.map(month => revenueByMonth[month]);
      
      setChartData({ labels, data });
      
      console.log('📊 Monthly Revenue from DB:', revenueByMonth);
    }
  }, [payments]);

  const chartConfig = {
    labels: chartData.labels,
    datasets: [
      {
        label: 'Monthly Revenue',
        data: chartData.data,
        borderColor: '#C45A32',
        backgroundColor: 'rgba(196, 90, 50, 0.1)',
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#C45A32',
        pointBorderColor: '#FFF',
        pointBorderWidth: 2,
        pointRadius: 4,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: '#2A3547',
        titleColor: '#FFF',
        bodyColor: '#FFF',
        borderColor: '#C45A32',
        borderWidth: 1,
        callbacks: {
          label: function(context) {
            return `$${context.parsed.y.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: '#7C8FAC'
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(145, 158, 171, 0.2)'
        },
        ticks: {
          color: '#7C8FAC',
          callback: function(value) {
            if (value >= 1000000) return `$${(value/1000000).toFixed(1)}M`;
            if (value >= 1000) return `$${(value/1000).toFixed(1)}k`;
            return `$${value}`;
          }
        }
      }
    }
  };

  // Calcular total anual
  const totalAnnualRevenue = Object.values(monthlyRevenue).reduce((sum, revenue) => sum + revenue, 0);
  const monthlyAverage = totalAnnualRevenue / 12;

  return (
    <div className="w-[753px] h-[411px] flex-shrink-0 rounded-[12px] bg-white shadow-[0_0_2px_0_rgba(145,158,171,0.20),0_12px_24px_-4px_rgba(145,158,171,0.12)] p-6">
      
      {/* Header */}
      <div className="flex w-full items-start justify-between mb-6">
        <div className="flex flex-col items-start gap-1 flex-1">
          <h3 className="text-[#2A3547] font-plus-jakarta text-[18px] font-semibold leading-[120%]">
            Revenue updates
          </h3>
          <p className="text-[#7C8FAC] font-plus-jakarta text-[14px] font-normal leading-[140%] tracking-[-0.28px]">
            Monthly Revenue Overview
          </p>
        </div>
      </div>

      {/* Información de ingresos */}
      <div className="mb-4 p-3 bg-[#F8F8F8] rounded-lg">
        <div className="flex justify-between items-center">
          <span className="text-[#7C8FAC] font-plus-jakarta text-[14px]">
            Total Annual Revenue:
          </span>
          <span className="text-[#2A3547] font-plus-jakarta text-[16px] font-semibold">
            ${totalAnnualRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="text-[#7C8FAC] font-plus-jakarta text-[12px]">
            Monthly Average:
          </span>
          <span className="text-[#2A3547] font-plus-jakarta text-[14px] font-semibold">
            ${monthlyAverage.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>
      </div>

      {/* Gráfico */}
      <div className="w-full h-[280px]">
        <Line data={chartConfig} options={options} />
      </div>

    </div>
  );
};

export default RevenueChart;