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
    { 
      key: 'name', 
      title: 'Nombre de la Experiencia',
      render: e => <span className="text-gray-900 dark:text-white font-medium">{e.name}</span>
    },
    { 
      key: 'category', 
      title: 'Categoría',
      render: e => (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
          {e.category}
        </span>
      )
    },
    { 
      key: 'business', 
      title: 'Negocio',
      render: e => <span className="text-gray-700 dark:text-gray-300">{e.business}</span>
    },
    { 
      key: 'location', 
      title: 'Ubicación',
      render: e => <span className="text-gray-700 dark:text-gray-300">{e.location}</span>
    },
    { 
      key: 'description', 
      title: 'Descripción',
      render: e => <span className="text-gray-600 dark:text-gray-400 text-sm">{e.description}</span>
    },
    { 
      key: 'price', 
      title: 'Precio',
      render: e => (
        <span className={`font-semibold ${
          e.price === 'No disponible' 
            ? 'text-gray-500 dark:text-gray-400' 
            : 'text-green-600 dark:text-green-400'
        }`}>
          {e.price}
        </span>
      )
    },
    { 
      key: 'date', 
      title: 'Fecha de la Experiencia',
      render: e => <span className="text-gray-700 dark:text-gray-300">{e.date}</span>
    },
    { 
      key: 'createdAt', 
      title: 'Fecha Registro', 
      render: e => (
        <span className="text-gray-600 dark:text-gray-400 text-sm">
          {e.createdAt ? new Date(e.createdAt).toLocaleString('es-ES') : 'No disponible'}
        </span>
      )
    }
  ];

  return (
    <div className="dashboard-card flex flex-col min-h-[400px] bg-white dark:bg-gray-800 rounded-lg shadow transition-colors duration-300">
      <div className="border-b border-gray-200 dark:border-gray-700 p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Lista de Experiencias ({experiences.length})
        </h3>
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