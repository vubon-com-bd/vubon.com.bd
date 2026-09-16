'use client';
import { forwardRef, type HTMLAttributes, type ReactNode, type ThHTMLAttributes, type TdHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

export interface TableProps extends HTMLAttributes<HTMLTableElement> {
  readonly children: ReactNode;
  readonly caption?: string;
}

export const Table = forwardRef<HTMLTableElement, TableProps>(function Table(
  { children, caption, className, ...rest },
  ref,
) {
  return (
    <div className="w-full overflow-x-auto">
      <table
        ref={ref}
        className={cn('w-full border-collapse text-sm', className)}
        {...rest}
      >
        {caption && <caption className="caption-bottom py-2 text-xs text-slate-500">{caption}</caption>}
        {children}
      </table>
    </div>
  );
});

Table.displayName = 'Table';

export interface ThProps extends ThHTMLAttributes<HTMLTableCellElement> {
  readonly scope?: 'col' | 'row' | 'colgroup' | 'rowgroup';
}

export const Th = forwardRef<HTMLTableCellElement, ThProps>(function Th(
  { scope = 'col', className, children, ...rest },
  ref,
) {
  return (
    <th
      ref={ref}
      scope={scope}
      className={cn('border-b border-slate-200 px-3 py-2 text-left font-medium text-slate-700', className)}
      {...rest}
    >
      {children}
    </th>
  );
});

Th.displayName = 'Th';

export interface TdProps extends TdHTMLAttributes<HTMLTableCellElement> {
  readonly children?: ReactNode;
}

export const Td = forwardRef<HTMLTableCellElement, TdProps>(function Td(
  { className, children, ...rest },
  ref,
) {
  return (
    <td
      ref={ref}
      className={cn('border-b border-slate-100 px-3 py-2 text-slate-700', className)}
      {...rest}
    >
      {children}
    </td>
  );
});

Td.displayName = 'Td';
