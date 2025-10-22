import DataTable from './DataTable';

const ExperiencesTable = ({ experiences = [], loading = false }) => {
  const normalizedExperiences = experiences.map((e, index) => ({
    index: index + 1,
    id: e.id,
    name: e.name || 'Sin nombre',
    category: e.category?.name || 'Sin categoría',
    business: e.business?.businessName || 'Sin negocio',
    location: e.locationRel?.name || e.location || 'No especificada',
    description: e.description || 'Sin descripción',
    price: e.price != null ? `$${e.price.toFixed(2)}` : 'No disponible',
    date: e.date ? new Date(e.date).toLocaleDateString('es-ES') : 'No disponible',
    createdAt: e.createdAt
  }));

  const experienceColumns = [
    { key: 'index', title: '#' },
    { key: 'id', title: 'ID' },
    { key: 'name', title: 'Nombre de la Experiencia' },
    { key: 'category', title: 'Categoría' },
    { key: 'business', title: 'Negocio' },
    { key: 'location', title: 'Ubicación' },
    { key: 'description', title: 'Descripción' },
    { key: 'price', title: 'Precio' },
    { key: 'date', title: 'Fecha de la Experiencia' },
    { 
      key: 'createdAt', 
      title: 'Fecha Registro', 
      render: e => e.createdAt ? new Date(e.createdAt).toLocaleString('es-ES') : 'No disponible'
    }
  ];

  return (
    <div className="dashboard-card flex flex-col min-h-[400px]">
      <div className="border-b border-gray-200 p-4">
        <h3 className="text-lg font-semibold">Lista de Experiencias ({experiences.length})</h3>
      </div>

      <div className="flex-1 overflow-y-auto">
        <DataTable
          data={normalizedExperiences}
          columns={experienceColumns}
          loading={loading}
          emptyMessage="No hay experiencias registradas en la base de datos"
        />
      </div>
    </div>
  );
};

export default ExperiencesTable;
