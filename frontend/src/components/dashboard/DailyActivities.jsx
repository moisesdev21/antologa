import React from "react";
import useDashboardData from "../../hooks/useDashboardData";

export default function DailyActivities() {
  const { experiences, loading, errors } = useDashboardData();

  if (loading) return <div className="p-4 text-gray-500 dark:text-gray-400">Loading activities...</div>;
  if (errors.activityLogs) return <div className="p-4 text-red-500 dark:text-red-400">Error loading activities.</div>;

  return (
    <div className="bg-white dark:bg-dark-surface rounded-lg p-6 max-w-lg mx-auto transition-colors duration-300">
      <h2 className="text-xl font-bold mb-4 text-[#282828] dark:text-white">📅 Daily Activities</h2>

      {experiences && experiences.length > 0 ? (
        <ul className="space-y-3">
          {experiences.map(exp => (
            <li 
              key={exp.experience_id} 
              className="border-l-4 border-blue-500 pl-4 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
            >
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-800 dark:text-white">{exp.name}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(exp.date).toLocaleDateString()}
                </span>
              </div>
              {exp.description && (
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{exp.description}</p>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 dark:text-gray-400">No activities for today.</p>
      )}
    </div>
  );
}