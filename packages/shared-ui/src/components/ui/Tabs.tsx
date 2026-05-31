/**
 * Table Component - Data table with sorting and pagination
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-ui/src/components/ui/Table
 * 
 * RULES:
 * ✅ ONLY UI table component - NO business logic
 * ✅ NO fetching users, fetching orders, API integration
 * ✅ Pure UI component with sorting/pagination UI
 * ✅ TypeScript strict with generics
 */

import React from 'react';
import { cn } from '../../utils/cn';

// ==================== Types ====================

export interface TableColumn<T = unknown> {
  /** Unique key for the column */
  key: string;
  /** Column header text */
  header: string;
  /** Bengali header text (optional) */
  headerBn?: string;
  /** Custom render function for cell */
  render?: (item: T, index: number) => React.ReactNode;
  /** Whether column is sortable */
  sortable?: boolean;
  /** Width of the column */
  width?: string | number;
  /** Alignment of content */
  align?: 'left' | 'center' | 'right';
  /** Additional CSS classes */
  className?: string;
  /** Whether to hide on mobile (responsive) */
  hideOnMobile?: boolean;
}

export interface TableProps<T = unknown> {
  /** Table columns configuration */
  columns: TableColumn<T>[];
  /** Table data */
  data: T[];
  /** Loading state */
  loading?: boolean;
  /** Empty state message */
  emptyMessage?: string;
  /** Empty state message in Bengali */
  emptyMessageBn?: string;
  /** Callback when row is clicked */
  onRowClick?: (item: T, index: number) => void;
  /** Current sort key */
  sortKey?: string;
  /** Current sort direction */
  sortDirection?: 'asc' | 'desc';
  /** Callback when sort changes */
  onSort?: (key: string, direction: 'asc' | 'desc') => void;
  /** Current locale for header labels */
  locale?: 'en' | 'bn';
  /** Additional CSS classes */
  className?: string;
  /** Whether table has hover effect on rows */
  hover?: boolean;
  /** Whether table has striped rows */
  striped?: boolean;
  /** Whether table has bordered cells */
  bordered?: boolean;
  /** Compact mode (smaller padding) */
  compact?: boolean;
  /** Current page (for displaying row numbers) */
  currentPage?: number;
  /** Page size (for displaying row numbers) */
  pageSize?: number;
}

// ==================== Alignment Classes ====================

const alignClasses = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

// ==================== Table Header ====================

interface TableHeaderProps<T> {
  columns: TableColumn<T>[];
  sortKey?: string;
  sortDirection?: 'asc' | 'desc';
  onSort?: (key: string) => void;
  locale?: 'en' | 'bn';
}

const TableHeader = <T,>({
  columns,
  sortKey,
  sortDirection,
  onSort,
  locale = 'en',
}: TableHeaderProps<T>) => {
  const getHeaderText = (column: TableColumn<T>): string => {
    if (locale === 'bn' && column.headerBn) {
      return column.headerBn;
    }
    return column.header;
  };

  return (
    <thead className="bg-gray-50 dark:bg-gray-800">
      <tr>
        {columns.map((column) => (
          <th
            key={column.key}
            onClick={() => column.sortable && onSort?.(column.key)}
            className={cn(
              'px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400',
              column.sortable && 'cursor-pointer select-none hover:bg-gray-100 dark:hover:bg-gray-700',
              alignClasses[column.align || 'left'],
              column.hideOnMobile && 'hidden sm:table-cell',
              column.className
            )}
            style={column.width ? { width: column.width } : undefined}
          >
            <div className="flex items-center gap-1">
              <span>{getHeaderText(column)}</span>
              {column.sortable && (
                <span className="inline-flex flex-col">
                  <svg
                    className={cn(
                      'h-2 w-2',
                      sortKey === column.key && sortDirection === 'asc'
                        ? 'text-primary-600'
                        : 'text-gray-400'
                    )}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z" />
                  </svg>
                  <svg
                    className={cn(
                      'h-2 w-2',
                      sortKey === column.key && sortDirection === 'desc'
                        ? 'text-primary-600'
                        : 'text-gray-400'
                    )}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
                  </svg>
                </span>
              )}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
};

// ==================== Table Body ====================

interface TableBodyProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  loading?: boolean;
  emptyMessage?: string;
  emptyMessageBn?: string;
  onRowClick?: (item: T, index: number) => void;
  hover?: boolean;
  striped?: boolean;
  compact?: boolean;
  locale?: 'en' | 'bn';
  startIndex?: number;
}

const TableBody = <T,>({
  columns,
  data,
  loading,
  emptyMessage = 'No data available',
  emptyMessageBn = 'কোনো ডেটা নেই',
  onRowClick,
  hover = true,
  striped = false,
  compact = false,
  locale = 'en',
  startIndex = 0,
}: TableBodyProps<T>) => {
  const emptyText = locale === 'bn' ? emptyMessageBn : emptyMessage;
  const rowPadding = compact ? 'px-4 py-2' : 'px-6 py-4';

  if (loading) {
    return (
      <tbody>
        <tr>
          <td colSpan={columns.length} className="px-6 py-12 text-center">
            <div className="flex justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-primary-500 dark:border-gray-700" />
            </div>
          </td>
        </tr>
      </tbody>
    );
  }

  if (data.length === 0) {
    return (
      <tbody>
        <tr>
          <td
            colSpan={columns.length}
            className="px-6 py-12 text-center text-gray-500 dark:text-gray-400"
          >
            {emptyText}
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
      {data.map((item, index) => (
        <tr
          key={index}
          onClick={() => onRowClick?.(item, index)}
          className={cn(
            hover && 'hover:bg-gray-50 dark:hover:bg-gray-800',
            striped && index % 2 === 1 && 'bg-gray-50 dark:bg-gray-800/50',
            onRowClick && 'cursor-pointer'
          )}
        >
          {columns.map((column) => (
            <td
              key={column.key}
              className={cn(
                'whitespace-nowrap text-sm text-gray-900 dark:text-gray-300',
                rowPadding,
                alignClasses[column.align || 'left'],
                column.hideOnMobile && 'hidden sm:table-cell',
                column.className
              )}
            >
              {column.render
                ? column.render(item, startIndex + index)
                : (item as Record<string, unknown>)[column.key] as string}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

// ==================== Main Component ====================

/**
 * Table - Data table component with sorting and pagination UI
 * 
 * @example
 * // Basic table
 * <Table
 *   columns={[
 *     { key: 'name', header: 'Name' },
 *     { key: 'email', header: 'Email' },
 *     { key: 'role', header: 'Role' },
 *   ]}
 *   data={users}
 * />
 * 
 * @example
 * // With custom render and sorting
 * <Table
 *   columns={[
 *     { key: 'name', header: 'Name', sortable: true },
 *     { 
 *       key: 'status', 
 *       header: 'Status',
 *       render: (item) => <Badge variant={item.status === 'active' ? 'success' : 'default'}>
 *         {item.status}
 *       </Badge>
 *     },
 *   ]}
 *   data={users}
 *   sortKey={sortKey}
 *   sortDirection={sortDirection}
 *   onSort={handleSort}
 * />
 * 
 * @example
 * // With Bengali locale
 * <Table
 *   columns={[
 *     { key: 'name', header: 'Name', headerBn: 'নাম' },
 *     { key: 'email', header: 'Email', headerBn: 'ইমেইল' },
 *   ]}
 *   data={users}
 *   locale="bn"
 * />
 */
export const Table = <T,>({
  columns,
  data,
  loading = false,
  emptyMessage,
  emptyMessageBn,
  onRowClick,
  sortKey,
  sortDirection,
  onSort,
  locale = 'en',
  className,
  hover = true,
  striped = false,
  bordered = false,
  compact = false,
  currentPage = 1,
  pageSize = 10,
}: TableProps<T>) => {
  const handleSort = (key: string) => {
    if (!onSort) return;
    const newDirection =
      sortKey === key && sortDirection === 'asc' ? 'desc' : 'asc';
    onSort(key, newDirection);
  };

  const startIndex = (currentPage - 1) * pageSize;

  return (
    <div
      className={cn(
        'overflow-x-auto rounded-lg',
        bordered && 'border border-gray-200 dark:border-gray-700',
        className
      )}
    >
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <TableHeader
          columns={columns}
          sortKey={sortKey}
          sortDirection={sortDirection}
          onSort={handleSort}
          locale={locale}
        />
        <TableBody
          columns={columns}
          data={data}
          loading={loading}
          emptyMessage={emptyMessage}
          emptyMessageBn={emptyMessageBn}
          onRowClick={onRowClick}
          hover={hover}
          striped={striped}
          compact={compact}
          locale={locale}
          startIndex={startIndex}
        />
      </table>
    </div>
  );
};

Table.displayName = 'Table';

// ==================== Table Caption ====================

export interface TableCaptionProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * TableCaption - Caption for the table
 */
export const TableCaption: React.FC<TableCaptionProps> = ({ children, className }) => {
  return <caption className={cn('py-2 text-left text-sm text-gray-500', className)}>{children}</caption>;
};

TableCaption.displayName = 'TableCaption';
