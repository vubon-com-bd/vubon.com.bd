/**
 * Table Component - Data table with sorting, pagination, and selection
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce

 * @module shared-ui/src/components/ui/Table

 * RULES:
 * ✅ ONLY UI table component - NO business logic
 * ✅ NO fetching users, fetching orders, API integration
 * ✅ Pure UI component with sorting/pagination UI
 * ✅ TypeScript strict with generics
 * ✅ Full accessibility support
 */

import React from 'react';
import { cn } from '../../utils/cn';

// ==================== Types ====================

export type SortDirection = 'asc' | 'desc';

export interface TableColumn<T> {
  /** Unique key for the column (must be a key of T) */
  key: keyof T | 'select' | 'index' | 'actions';
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
  /** Whether to show index numbers (for index column) */
  showIndex?: boolean;
}

export interface TableProps<T> {
  /** Table columns configuration */
  columns: TableColumn<T>[];
  /** Table data */
  data: T[];
  /** Unique key field name for row identification (for selection) */
  rowKey?: keyof T;
  /** Loading state */
  loading?: boolean;
  /** Empty state message */
  emptyMessage?: string;
  /** Empty state message in Bengali */
  emptyMessageBn?: string;
  /** Callback when row is clicked */
  onRowClick?: (item: T, index: number) => void;
  /** Current sort key */
  sortKey?: keyof T;
  /** Current sort direction */
  sortDirection?: SortDirection;
  /** Callback when sort changes */
  onSort?: (key: keyof T, direction: SortDirection) => void;
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
  /** Enable row selection */
  selectable?: boolean;
  /** Selected row keys */
  selectedRowKeys?: string[];
  /** Callback when selection changes */
  onSelectionChange?: (selectedKeys: string[]) => void;
  /** Enable row numbering */
  showRowNumber?: boolean;
  /** Loading component */
  loadingComponent?: React.ReactNode;
  /** Empty state component */
  emptyComponent?: React.ReactNode;
}

export interface TableColumnConfig<T> {
  /** Accessor function to get value from item */
  accessor?: (item: T) => React.ReactNode;
}

// ==================== Alignment Classes ====================

const alignClasses = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
} as const;

// ==================== Helper Functions ====================

/**
 * Type-safe value getter for table cell
 */
const getCellValue = <T,>(item: T, key: keyof T): string => {
  const value = item[key];
  if (value === null || value === undefined) return '';
  return String(value);
};

/**
 * Check if row is selected
 */
const isRowSelected = <T,>(item: T, rowKey: keyof T, selectedRowKeys: string[]): boolean => {
  const keyValue = String(item[rowKey]);
  return selectedRowKeys.includes(keyValue);
};

// ==================== Subcomponents ====================

interface TableHeaderProps<T> {
  columns: TableColumn<T>[];
  sortKey?: keyof T;
  sortDirection?: SortDirection;
  onSort?: (key: keyof T) => void;
  locale?: 'en' | 'bn';
  selectable?: boolean;
  selectedAll?: boolean;
  someSelected?: boolean;
  onSelectAll?: () => void;
}

const TableHeader = <T,>({
  columns,
  sortKey,
  sortDirection,
  onSort,
  locale = 'en',
  selectable,
  selectedAll,
  someSelected,
  onSelectAll,
}: TableHeaderProps<T>) => {
  const getHeaderText = (column: TableColumn<T>): string => {
    if (locale === 'bn' && column.headerBn) {
      return column.headerBn;
    }
    return column.header;
  };

  const handleSort = (key: keyof T) => {
    if (onSort) {
      onSort(key);
    }
  };

  return (
    <thead className="bg-gray-50 dark:bg-gray-800">
      <tr>
        {/* Select all checkbox */}
        {selectable && (
          <th className="w-10 px-4 py-3 text-left">
            <input
              type="checkbox"
              checked={selectedAll}
              ref={(input) => {
                if (input) {
                  input.indeterminate = someSelected === true && !selectedAll;
                }
              }}
              onChange={onSelectAll}
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              aria-label="Select all rows"
            />
          </th>
        )}

        {columns.map((column) => (
          <th
            key={String(column.key)}
            onClick={() => column.sortable && handleSort(column.key as keyof T)}
            className={cn(
              'px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400',
              column.sortable && 'cursor-pointer select-none hover:bg-gray-100 dark:hover:bg-gray-700',
              alignClasses[column.align || 'left'],
              column.hideOnMobile && 'hidden sm:table-cell',
              column.className
            )}
            style={column.width ? { width: column.width } : undefined}
            aria-sort={
              column.sortable && sortKey === column.key
                ? sortDirection === 'asc'
                  ? 'ascending'
                  : 'descending'
                : undefined
            }
          >
            <div className="flex items-center gap-1">
              <span>{getHeaderText(column)}</span>
              {column.sortable && (
                <span className="inline-flex flex-col" aria-hidden="true">
                  <svg
                    className={cn(
                      'h-2 w-2 transition-colors',
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
                      'h-2 w-2 transition-colors',
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

interface TableBodyProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  rowKey?: keyof T;
  loading?: boolean;
  emptyMessage?: string;
  emptyMessageBn?: string;
  emptyComponent?: React.ReactNode;
  loadingComponent?: React.ReactNode;
  onRowClick?: (item: T, index: number) => void;
  onRowSelect?: (item: T, selected: boolean) => void;
  selectedRowKeys?: string[];
  hover?: boolean;
  striped?: boolean;
  compact?: boolean;
  locale?: 'en' | 'bn';
  startIndex?: number;
  showRowNumber?: boolean;
  selectable?: boolean;
}

const TableBody = <T,>({
  columns,
  data,
  rowKey,
  loading,
  emptyMessage = 'No data available',
  emptyMessageBn = 'কোনো ডেটা নেই',
  emptyComponent,
  loadingComponent,
  onRowClick,
  onRowSelect,
  selectedRowKeys = [],
  hover = true,
  striped = false,
  compact = false,
  locale = 'en',
  startIndex = 0,
  showRowNumber = false,
  selectable = false,
}: TableBodyProps<T>) => {
  const emptyText = locale === 'bn' ? emptyMessageBn : emptyMessage;
  const rowPadding = compact ? 'px-4 py-2' : 'px-6 py-4';

  // Loading state
  if (loading) {
    return (
      <tbody>
        <tr>
          <td
            colSpan={columns.length + (selectable ? 1 : 0) + (showRowNumber ? 1 : 0)}
            className="px-6 py-12 text-center"
          >
            {loadingComponent || (
              <div className="flex justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-primary-500 dark:border-gray-700" />
              </div>
            )}
          </td>
        </tr>
      </tbody>
    );
  }

  // Empty state
  if (data.length === 0) {
    return (
      <tbody>
        <tr>
          <td
            colSpan={columns.length + (selectable ? 1 : 0) + (showRowNumber ? 1 : 0)}
            className="px-6 py-12 text-center text-gray-500 dark:text-gray-400"
          >
            {emptyComponent || emptyText}
          </td>
        </tr>
      </tbody>
    );
  }

  const handleRowSelect = (item: T, event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    onRowSelect?.(item, event.target.checked);
  };

  const renderCell = (column: TableColumn<T>, item: T, index: number): React.ReactNode => {
    // Handle special column types
    if (column.key === 'select') {
      return null; // Handled separately
    }

    if (column.key === 'index' && column.showIndex) {
      return startIndex + index + 1;
    }

    if (column.render) {
      return column.render(item, startIndex + index);
    }

    // Type-safe value access
    if (typeof column.key === 'string' && column.key !== 'actions') {
      return getCellValue(item, column.key as keyof T);
    }

    return null;
  };

  const isItemSelected = (item: T): boolean => {
    if (!rowKey || !selectable) return false;
    const keyValue = String(item[rowKey]);
    return selectedRowKeys.includes(keyValue);
  };

  return (
    <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
      {data.map((item, index) => {
        const isSelected = isItemSelected(item);
        const rowNumber = startIndex + index + 1;

        return (
          <tr
            key={rowKey ? String(item[rowKey]) : index}
            onClick={() => onRowClick?.(item, startIndex + index)}
            className={cn(
              'transition-colors duration-150',
              hover && 'hover:bg-gray-50 dark:hover:bg-gray-800',
              striped && index % 2 === 1 && 'bg-gray-50 dark:bg-gray-800/50',
              selectable && isSelected && 'bg-primary-50 dark:bg-primary-950/20',
              onRowClick && 'cursor-pointer'
            )}
          >
            {/* Selection checkbox */}
            {selectable && (
              <td className={cn('w-10 px-4 py-2', rowPadding)}>
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={(e) => handleRowSelect(item, e)}
                  onClick={(e) => e.stopPropagation()}
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  aria-label={`Select row ${rowNumber}`}
                />
              </td>
            )}

            {/* Row number */}
            {showRowNumber && (
              <td
                className={cn(
                  'w-12 text-center text-sm text-gray-500 dark:text-gray-400',
                  rowPadding
                )}
              >
                {rowNumber}
              </td>
            )}

            {/* Data cells */}
            {columns.map((column) => (
              <td
                key={String(column.key)}
                className={cn(
                  'whitespace-nowrap text-sm text-gray-900 dark:text-gray-300',
                  rowPadding,
                  alignClasses[column.align || 'left'],
                  column.hideOnMobile && 'hidden sm:table-cell',
                  column.className
                )}
              >
                {renderCell(column, item, startIndex + index)}
              </td>
            ))}
          </tr>
        );
      })}
    </tbody>
  );
};

// ==================== Main Component ====================

/**
 * Table - Data table component with sorting, pagination, and selection
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

 * @example
 * // With sorting
 * const [sortKey, setSortKey] = useState<keyof User>('name');
 * const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
 *
 * <Table
 *   columns={[
 *     { key: 'name', header: 'Name', sortable: true },
 *     { key: 'email', header: 'Email', sortable: true },
 *   ]}
 *   data={sortedUsers}
 *   sortKey={sortKey}
 *   sortDirection={sortDirection}
 *   onSort={(key, direction) => {
 *     setSortKey(key);
 *     setSortDirection(direction);
 *   }}
 * />

 * @example
 * // With selection
 * <Table
 *   columns={[{ key: 'name', header: 'Name' }]}
 *   data={users}
 *   rowKey="id"
 *   selectable
 *   selectedRowKeys={selectedIds}
 *   onSelectionChange={setSelectedIds}
 * />

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
export const Table = <T extends Record<string, unknown>>({
  columns,
  data,
  rowKey,
  loading = false,
  emptyMessage,
  emptyMessageBn,
  emptyComponent,
  loadingComponent,
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
  selectable = false,
  selectedRowKeys = [],
  onSelectionChange,
  showRowNumber = false,
}: TableProps<T>): React.ReactElement => {
  const handleSort = (key: keyof T) => {
    if (!onSort) return;
    const newDirection =
      sortKey === key && sortDirection === 'asc' ? 'desc' : 'asc';
    onSort(key, newDirection);
  };

  const handleSelectAll = () => {
    if (!onSelectionChange) return;

    const allKeys = data.map((item) => {
      if (!rowKey) return '';
      return String(item[rowKey]);
    });

    const allSelected = allKeys.length > 0 && allKeys.every((key) => selectedRowKeys.includes(key));
    const newSelectedKeys = allSelected ? [] : allKeys;
    onSelectionChange(newSelectedKeys);
  };

  const handleRowSelect = (item: T, selected: boolean) => {
    if (!onSelectionChange || !rowKey) return;

    const keyValue = String(item[rowKey]);
    const newSelectedKeys = selected
      ? [...selectedRowKeys, keyValue]
      : selectedRowKeys.filter((k) => k !== keyValue);
    onSelectionChange(newSelectedKeys);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const selectedAll = data.length > 0 && data.every((item) => {
    if (!rowKey) return false;
    return selectedRowKeys.includes(String(item[rowKey]));
  });
  const someSelected = selectedRowKeys.length > 0 && !selectedAll;

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
          selectable={selectable}
          selectedAll={selectedAll}
          someSelected={someSelected}
          onSelectAll={handleSelectAll}
        />
        <TableBody
          columns={columns}
          data={data}
          rowKey={rowKey}
          loading={loading}
          emptyMessage={emptyMessage}
          emptyMessageBn={emptyMessageBn}
          emptyComponent={emptyComponent}
          loadingComponent={loadingComponent}
          onRowClick={onRowClick}
          onRowSelect={handleRowSelect}
          selectedRowKeys={selectedRowKeys}
          hover={hover}
          striped={striped}
          compact={compact}
          locale={locale}
          startIndex={startIndex}
          showRowNumber={showRowNumber}
          selectable={selectable}
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
  return (
    <caption className={cn('py-2 text-left text-sm text-gray-500 dark:text-gray-400', className)}>
      {children}
    </caption>
  );
};

TableCaption.displayName = 'TableCaption';

// ==================== Action Buttons Cell ====================

export interface ActionItem {
  label: string;
  icon?: React.ReactNode;
  onClick: (item: unknown) => void;
  variant?: 'default' | 'danger' | 'success' | 'warning';
  disabled?: boolean;
}

export interface TableActionsProps<T> {
  item: T;
  actions: ActionItem[];
  size?: 'sm' | 'md';
}

/**
 * TableActions - Action buttons cell for tables
 */
export const TableActions = <T,>({
  item,
  actions,
  size = 'sm',
}: TableActionsProps<T>): React.ReactElement => {
  const buttonSizeClasses = size === 'sm' ? 'p-1' : 'p-1.5';

  const variantClasses = {
    default: 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300',
    danger: 'text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300',
    success: 'text-green-500 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300',
    warning: 'text-yellow-500 hover:text-yellow-700 dark:text-yellow-400 dark:hover:text-yellow-300',
  };

  return (
    <div className="flex items-center gap-1">
      {actions.map((action, idx) => (
        <button
          key={idx}
          type="button"
          onClick={() => action.onClick(item)}
          disabled={action.disabled}
          className={cn(
            'rounded transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500',
            buttonSizeClasses,
            variantClasses[action.variant || 'default'],
            action.disabled && 'cursor-not-allowed opacity-50'
          )}
          aria-label={action.label}
          title={action.label}
        >
          {action.icon || action.label.charAt(0)}
        </button>
      ))}
    </div>
  );
};

TableActions.displayName = 'TableActions';
