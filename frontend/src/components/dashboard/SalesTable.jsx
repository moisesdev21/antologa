// src/components/dashboard/SalesTable.jsx
import DataTable from './DataTable';

const SalesTable = ({ payments = [], loading = false }) => {
  const normalizedPayments = payments.map((p, index) => ({
    payment_id: p.id,
    user: { name: p.cliente || "Usuario no disponible" },
    business: p.businessName || "-",
    amount: p.amount ?? 0,
    commission: p.commission ?? 0,
    paymentDate: p.paymentDate,
    status: p.status,
    createdAt: p.createdAt,
    index: index + 1
  }));

  const paymentColumns = [
    { key: 'payment_id', title: 'ID', render: p => `#${p.payment_id}` },
    { key: 'user', title: 'Cliente', render: p => <span className="truncate max-w-[150px] block">{p.user.name}</span> },
    { key: 'business', title: 'Negocio', render: p => <span className="truncate max-w-[150px] block">{p.business}</span> },
    { key: 'amount', title: 'Monto', render: p => `$${Number(p.amount).toFixed(2)}` },
    { key: 'commission', title: 'Comisión', render: p => `$${Number(p.commission).toFixed(2)}` },
    { key: 'paymentDate', title: 'Fecha Pago', render: p => new Date(p.paymentDate).toLocaleDateString('es-ES') },
    { 
      key: 'status', 
      title: 'Estado', 
      render: p => {
        const styles = {
          Confirmed: 'bg-green-100 text-green-800',
          Pending: 'bg-yellow-100 text-yellow-800',
          Failed: 'bg-red-100 text-red-800'
        };
        return (
          <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${styles[p.status] || 'bg-gray-100 text-gray-800'}`}>
            {p.status === "Confirmed" ? "Confirmado" : p.status}
          </span>
        );
      }
    },
    { key: 'createdAt', title: 'Fecha Creación', render: p => new Date(p.createdAt).toLocaleDateString('es-ES') }
  ];

  return (
    <div className="dashboard-card flex flex-col min-h-[400px] overflow-x-hidden">
      <div className="border-b border-gray-200 p-4">
        <h3 className="text-lg font-semibold truncate">Historial de Pagos ({payments.length})</h3>
      </div>

      <div className="overflow-visible">
        <DataTable
          data={normalizedPayments}
          columns={paymentColumns}
          loading={loading}
          emptyMessage="No hay registros de pagos"
        />
      </div>
    </div>
  );
};

export default SalesTable;
