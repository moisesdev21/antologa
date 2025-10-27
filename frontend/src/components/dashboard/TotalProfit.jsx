// src/components/dashboard/TotalProfit.jsx
import { useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const COLOR = "#5D87FF";

// Colores para dark mode
const DARK_COLORS = {
  axis: "#9CA3AF",
  grid: "#374151",
  text: "#FFFFFF",
  subtitle: "#9CA3AF",
  background: "#ECF2FF",
};

function groupByYearSum(payments) {
  const map = new Map();
  for (const p of payments) {
    const d = new Date(p.paymentDate || p.createdAt || Date.now());
    const y = d.getFullYear();
    const amount = Number(p.amount) || 0;
    map.set(y, (map.get(y) || 0) + amount);
  }
  return map;
}

export default function TotalProfit({ payments = [] }) {
  const { data, lastPoint } = useMemo(() => {
    const map = groupByYearSum(payments);
    const years = Array.from(map.keys()).sort((a, b) => a - b);
    const last4 = years.slice(-4);

    const rows = last4.map((y) => ({
      year: String(y),
      total: Number((map.get(y) || 0).toFixed(2)),
    }));

    const lp = rows.length ? rows[rows.length - 1] : null;
    return { data: rows, lastPoint: lp };
  }, [payments]);

  // Detectar si estamos en dark mode
  const isDarkMode = document.documentElement.classList.contains('dark');

  return (
    <div className="w-[362px] h-[415px] bg-white dark:bg-dark-surface rounded-[12px] p-6 transition-colors duration-300">
      <div className="flex items-center justify-between">
        <h3 className="text-[#2A3547] dark:text-white font-plus-jakarta font-semibold text-[18px]">
          Total profit
        </h3>
        <div className="w-6 h-6 rounded flex items-center justify-center">
          <span className="w-[3px] h-[15px] bg-[#7C8FAC] dark:bg-gray-400 block rounded-sm transition-colors duration-300" />
        </div>
      </div>

      <div className="mt-3 flex items-center gap-3">
        <div className="p-2 bg-[#ECF2FF] dark:bg-gray-700 rounded-md transition-colors duration-300">
          <img src="/public/logos/Puntos.svg" alt="puntos" />
        </div>
        <div>
          <div className="text-[21px] font-plus-jakarta font-semibold text-[#2A3547] dark:text-white">
            {lastPoint
              ? lastPoint.total.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })
              : "$0.00"}
          </div>
          <div className="text-[#7C8FAC] dark:text-gray-400 text-[14px] transition-colors duration-300">
            Total Earnings
          </div>
        </div>
      </div>

      <div className="mt-6 h-[275px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 0, right: 10, left: 0, bottom: 10 }}
          >
            <defs>
              <linearGradient id="profitFill" x1="0" y1="0" x2="0" y2="1">
                <stop 
                  offset="0%" 
                  stopColor={isDarkMode ? "#4B5563" : "#EDEAFF"} 
                  stopOpacity={1} 
                />
                <stop 
                  offset="100%" 
                  stopColor={isDarkMode ? "#4B5563" : "#EDEAFF"} 
                  stopOpacity={0} 
                />
              </linearGradient>
            </defs>

            <CartesianGrid 
              stroke={isDarkMode ? DARK_COLORS.grid : "#EAEFF4"} 
              vertical={false} 
            />
            <XAxis 
              dataKey="year" 
              stroke={isDarkMode ? DARK_COLORS.axis : "#7C8FAC"} 
              tickLine={false} 
            />
            <YAxis 
              stroke={isDarkMode ? DARK_COLORS.axis : "#7C8FAC"} 
              tickLine={false} 
            />
            <Area
              type="monotone"
              dataKey="total"
              stroke={COLOR}
              strokeWidth={2}
              fill="url(#profitFill)"
              activeDot={{
                r: 6,
                stroke: COLOR,
                strokeWidth: 2,
                fill: isDarkMode ? "#1F2937" : "#fff",
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}