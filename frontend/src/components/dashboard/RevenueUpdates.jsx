// src/components/dashboard/RevenueUpdates.jsx
import { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from "recharts";

const COLORS = {
  modernize: "#5D87FF", // Confirmed
  spike: "#49BEFF",     // Pending
  axis: "#7C8FAC",
  grid: "#EAEFF4",
};

// Colores para dark mode
const DARK_COLORS = {
  axis: "#9CA3AF",
  grid: "#374151",
};

function formatDateLabel(d) {
  // dd/mm
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  return `${dd}/${mm}`;
}

function startOfDay(d) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x.getTime();
}

export default function RevenueUpdates({ payments = [] }) {
  const data = useMemo(() => {
    // construir rango últimos 7 días
    const today = new Date();
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      days.push(startOfDay(d));
    }

    const bucket = new Map(days.map((t) => [t, { modernize: 0, spike: 0 }]));

    for (const p of payments) {
      const when = new Date(p.paymentDate || p.createdAt || Date.now());
      const key = startOfDay(when);
      if (!bucket.has(key)) continue; // sólo últimos 7 días

      // Confirmed => Modernize | Pending => Spike Admin
      const amount = Number(p.amount) || 0;
      if ((p.status || "").toLowerCase() === "confirmed") {
        bucket.get(key).modernize += amount;
      } else if ((p.status || "").toLowerCase() === "pending") {
        bucket.get(key).spike += amount;
      } else {
        // otros estados no se grafican, pero si quieres: súmalos a spike
        // bucket.get(key).spike += amount;
      }
    }

    return Array.from(bucket.entries()).map(([t, v]) => ({
      date: formatDateLabel(new Date(t)),
      modernize: Number(v.modernize.toFixed(2)),
      spike: Number(v.spike.toFixed(2)),
    }));
  }, [payments]);

  // Detectar si estamos en dark mode
  const isDarkMode = document.documentElement.classList.contains('dark');

  return (
    <div className="w-[753px] h-[411px] bg-white dark:bg-dark-surface rounded-xl p-6 transition-colors duration-300">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-[#2A3547] dark:text-white font-plus-jakarta font-semibold text-[18px]">
            Revenue updates
          </h2>
          <p className="text-[#7C8FAC] dark:text-gray-400 font-plus-jakarta text-[14px]">
            Overview of Profit
          </p>
        </div>
        <span className="h-8 flex items-center gap-1 px-4 rounded border border-[#DFE5EF] dark:border-gray-600 text-[#7C8FAC] dark:text-gray-400 text-[12px] font-semibold transition-colors duration-300">
          {new Date().toLocaleString(undefined, {
            month: "long",
            year: "numeric",
          })}
        </span>
      </div>

      <div className="flex items-center gap-4 mb-2">
        <span className="flex items-center gap-2 text-[#7C8FAC] dark:text-gray-400 text-[12px] transition-colors duration-300">
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: COLORS.modernize }} />
          Modernize
        </span>
        <span className="flex items-center gap-2 text-[#7C8FAC] dark:text-gray-400 text-[12px] transition-colors duration-300">
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: COLORS.spike }} />
          Spike Admin
        </span>
      </div>

      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
            <CartesianGrid 
              stroke={isDarkMode ? DARK_COLORS.grid : COLORS.grid} 
              vertical={false} 
            />
            <XAxis 
              dataKey="date" 
              stroke={isDarkMode ? DARK_COLORS.axis : COLORS.axis} 
              tickLine={false} 
            />
            <YAxis 
              stroke={isDarkMode ? DARK_COLORS.axis : COLORS.axis} 
              tickLine={false} 
            />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="modernize"
              name="Modernize"
              stroke={COLORS.modernize}
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="spike"
              name="Spike Admin"
              stroke={COLORS.spike}
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}