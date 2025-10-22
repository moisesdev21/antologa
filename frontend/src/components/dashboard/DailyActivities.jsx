import React from "react";
import useDashboardData from "../../hooks/useDashboardData";

export default function DailyActivities() {
  const { experiences, loading, errors } = useDashboardData();

  if (loading) return <div className="p-4 text-gray-500">Loading activities...</div>;
  if (errors.activityLogs) return <div className="p-4 text-red-500">Error loading activities.</div>;

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">📅 Daily Activities</h2>

      {experiences && experiences.length > 0 ? (
        <ul className="space-y-3">
          {experiences.map(exp => (
            <li key={exp.experience_id} className="border-l-4 border-blue-500 pl-4 bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-800">{exp.name}</span>
                <span className="text-sm text-gray-500">
                  {new Date(exp.date).toLocaleDateString()}
                </span>
              </div>
              {exp.description && (
                <p className="text-sm text-gray-600 mt-1">{exp.description}</p>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No activities for today.</p>
      )}
    </div>
  );
}
