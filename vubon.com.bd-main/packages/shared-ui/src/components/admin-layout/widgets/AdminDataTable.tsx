/**
 * Admin Data Table Component
 * Generic table component with custom rendering support
 */

import React from 'react';

export interface Column<T> {
  key: keyof T | string;
  header: string;
  render?: (item: T) => React.ReactNode;
  className?: string;
}

export interface AdminDataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  keyExtractor: (item: T) => string;
  className?: string;
  emptyMessage?: string;
}

export function AdminDataTable<T>({
  data,
  columns,
  keyExtractor,
  className = '',
  emptyMessage = 'No data available',
}: AdminDataTableProps<T>): React.ReactElement {
  if (data.length === 0) {
    return (
      <div className={`rounded-lg bg-white p-8 text-center shadow-sm ${className}`}>
        <p className="text-gray-500">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={`overflow-hidden rounded-lg bg-white shadow-sm ${className}`}>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 ${col.className || ''}`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {data.map((item) => (
              <tr key={keyExtractor(item)} className="transition-colors hover:bg-gray-50">
                {columns.map((col) => (
                  <td
                    key={String(col.key)}
                    className={`whitespace-nowrap px-6 py-4 text-sm text-gray-900 ${col.className || ''}`}
                  >
                    {col.render ? col.render(item) : String(item[col.key as keyof T] ?? '')}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

AdminDataTable.displayName = 'AdminDataTable';
