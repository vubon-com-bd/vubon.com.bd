'use client';
import { cn } from '../../utils/cn';
import type { ReactNode } from 'react';

export interface DataTableColumn<T> {
  readonly key: string;
  readonly header: ReactNode;
  readonly render: (row: T) => ReactNode;
  readonly width?: string | number;
  readonly align?: 'left' | 'center' | 'right';
  readonly className?: string;
}

export interface DataTableProps<T> {
  readonly columns: readonly DataTableColumn<T>[];
  readonly rows: readonly T[];
  readonly getRowKey: (row: T, index: number) => string | number;
  readonly emptyState?: ReactNode;
  readonly loading?: boolean;
  readonly className?: string;
}

const alignClasses = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
} as const;

export function DataTable<T>({
  columns,
  rows,
  getRowKey,
  emptyState,
  loading,
  className,
}: DataTableProps<T>): JSX.Element {
  return (
    <div className={cn('w-full overflow-x-auto', className)}>
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                scope="col"
                style={{ width: col.width }}
                className={cn(
                  'border-b border-slate-200 px-3 py-2 font-medium text-slate-700',
                  alignClasses[col.align ?? 'left'],
                  col.className
                )}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={columns.length} className="px-3 py-8 text-center text-slate-500">
                Loading…
              </td>
            </tr>
          ) : rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-3 py-8 text-center text-slate-500">
                {emptyState ?? 'No data'}
              </td>
            </tr>
          ) : (
            rows.map((row, i) => (
              <tr key={getRowKey(row, i)} className="hover:bg-slate-50">
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={cn(
                      'border-b border-slate-100 px-3 py-2 text-slate-700',
                      alignClasses[col.align ?? 'left'],
                      col.className
                    )}
                  >
                    {col.render(row)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
