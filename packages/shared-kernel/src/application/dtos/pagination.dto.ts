/**
 * Pagination DTO
 * @module shared-kernel/application/dtos
 *
 * Values আসে shared-constants/common/pagination.constants থেকে।
 */
import { PAGINATION } from '@vubon/shared-constants/common';

export type SortDirection = 'asc' | 'desc';

export class PaginationDTO {
  page: number = PAGINATION.DEFAULT_PAGE;
  limit: number = PAGINATION.DEFAULT_LIMIT;
  sort?: string;
  order?: SortDirection;

  static create(input?: Partial<PaginationDTO>): PaginationDTO {
    const dto = new PaginationDTO();
    dto.page = Math.max(PAGINATION.DEFAULT_PAGE, input?.page ?? PAGINATION.DEFAULT_PAGE);
    dto.limit = Math.min(
      PAGINATION.MAX_LIMIT,
      Math.max(PAGINATION.MIN_LIMIT, input?.limit ?? PAGINATION.DEFAULT_LIMIT)
    );
    dto.sort = input?.sort;
    dto.order = input?.order ?? 'desc';
    return dto;
  }

  get offset(): number {
    return (this.page - 1) * this.limit;
  }
}
