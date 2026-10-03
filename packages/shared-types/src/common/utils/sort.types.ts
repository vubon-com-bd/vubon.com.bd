/**
 * Sort Utility
 * @module shared-types/common/utils
 */

export type SortDirection = 'asc' | 'desc';

export interface SortOption<TField extends string = string> {
  readonly field: TField;
  readonly direction: SortDirection;
}

export type SortOptions<TField extends string = string> = readonly SortOption<TField>[];
