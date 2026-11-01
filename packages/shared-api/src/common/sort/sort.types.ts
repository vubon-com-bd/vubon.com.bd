export type SortDirection = 'asc' | 'desc';

export interface SortField {
  readonly field: string;
  readonly direction: SortDirection;
}

export type SortSpec = SortField | readonly SortField[];
