import { Sort, SortField, SortOrder } from '../../common/sort.types';

/**
 * Analytics sort interface
 * Uses Omit because `field` is broader for analytics (any DB column).
 */
export interface AnalyticsSort extends Omit<Sort, 'field'> {
  field: SortField | string;
  order: SortOrder;
  aggregate?: 'sum' | 'avg' | 'min' | 'max' | 'count';
}
