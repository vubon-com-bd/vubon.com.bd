/**
 * Filter Types
 * Filtering and sorting data structures
 */

import { SortOrder } from './core-primitives.types';

/**
 * Filter Parameters
 * Standard filter request parameters
 */
export interface FilterParams {
  /** Search term */
  search?: string;
  /** Field to sort by */
  sortBy?: string;
  /** Sort order */
  sortOrder?: SortOrder;
  /** Filter by status */
  status?: string | string[];
  /** Filter by date range */
  dateRange?: {
    start?: Date;
    end?: Date;
  };
  /** Additional filters */
  filters?: Record<string, unknown>;
}
