/**
 * Pagination Query DTO
 * @module shared-kernel/interfaces/dtos
 */
import { PAGINATION } from '@vubon/shared-constants/common';

export interface PaginationQueryDTO {
  readonly page?: number;
  readonly limit?: number;
}

export class PaginationQueryDefaults {
  static readonly DEFAULT_PAGE = PAGINATION.DEFAULT_PAGE;
  static readonly DEFAULT_LIMIT = PAGINATION.DEFAULT_LIMIT;
  static readonly MAX_LIMIT = PAGINATION.MAX_LIMIT;
}
