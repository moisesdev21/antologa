import { useMemo } from "react";

const RecentTransactions = ({ payments = [] }) => {
  // Tomar solo las últimas 6 transacciones
  const latestPayments = useMemo(() => {
    return [...payments]
      .sort((a, b) => new Date(b.paymentDate) - new Date(a.paymentDate))
      .slice(0, 6);
  }, [payments]);

  return (
    <div className="w-full h-full flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-[#2A3547] dark:text-white font-plus-jakarta text-[18px] font-semibold transition-colors duration-300">
          Recent Transactions
        </h2>
        <button className="text-[#C45A32] text-[14px] font-semibold hover:underline transition-colors duration-300">
          View All
        </button>
      </div>

      {/* Table Container */}
      <div className="flex-1 overflow-y-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-[#7C8FAC] dark:text-gray-400 text-[13px] font-medium border-b dark:border-gray-600 transition-colors duration-300">
              <th className="py-2">Client</th>
              <th className="py-2">Amount</th>
              <th className="py-2">Status</th>
              <th className="py-2">Date</th>
            </tr>
          </thead>

          <tbody>
            {latestPayments.length > 0 ? (
              latestPayments.map((p, i) => (
                <tr key={i} className="border-b dark:border-gray-600 text-[14px] transition-colors duration-300">
                  <td className="py-2 font-medium text-[#2A3547] dark:text-white transition-colors duration-300">
                    {p.cliente || "Unknown"}
                  </td>
                  <td className="py-2 text-[#2A3547] dark:text-white transition-colors duration-300">
                    ${p.amount?.toFixed(2) || "0.00"}
                  </td>
                  <td
                    className={`py-2 font-semibold ${
                      p.status === "Confirmed"
                        ? "text-green-600"
                        : p.status === "Pending"
                        ? "text-yellow-500"
                        : "text-red-500"
                    }`}
                  >
                    {p.status}
                  </td>
                  <td className="py-2 text-[#7C8FAC] dark:text-gray-400 transition-colors duration-300">
                    {new Date(p.paymentDate).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-6 text-[#7C8FAC] dark:text-gray-400 transition-colors duration-300">
                  No recent transactions
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentTransactions;