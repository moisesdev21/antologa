import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import useDashboardData from "@/hooks/useDashboardData";

const YearlyProfitRing = () => {
  const { payments } = useDashboardData();

  // Agrupar pagos por año y sumar monto
  const yearlyProfits = payments
    .filter((p) => p.status === "Completed")
    .reduce((acc, p) => {
      const year = new Date(p.createdAt).getFullYear();
      acc[year] = (acc[year] || 0) + p.amount;
      return acc;
    }, {});

  // Generar rango dinámico desde 2025 hasta 2028 (por ejemplo)
  const currentYear = new Date().getFullYear();
  const years = [2025, 2026, 2027, 2028];

  const data = years.map((year) => ({
    name: year,
    value: yearlyProfits[year] || 0,
  }));

  const COLORS = ["#6366F1", "#3B82F6", "#14B8A6", "#10B981"];

  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="bg-white dark:bg-dark-surface h-[375px] p-6 rounded-2xl text-center transition-colors duration-300">
      <h2 className="text-lg font-semibold mb-1 text-[#282828] dark:text-white transition-colors duration-300">
        Yearly updates
      </h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 transition-colors duration-300">
        Overview of Profit
      </p>

      <div className="relative flex justify-center h-[250px] items-center text-[#282828] dark:text-white transition-colors duration-300">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <div className="absolute text-xl font-semibold">
          ${total.toLocaleString()}
        </div>
      </div>

      {/* Leyenda */}
      <div className="flex justify-center gap-4 mt-4 text-sm text-[#282828] dark:text-white transition-colors duration-300">
        {data.map((entry, index) => (
          <div key={entry.name} className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            ></span>
            <span>{entry.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YearlyProfitRing;