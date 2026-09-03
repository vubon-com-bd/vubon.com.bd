import { BaseResponseDTO } from './base-response.dto';
import { PaginationDTO } from './pagination.dto';

export class PaginatedResponseDTO<T> extends BaseResponseDTO<T[]> {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;

  constructor(items: T[], total: number, pagination: PaginationDTO) {
    super({
      success: true,
      data: items,
      message: 'Success',
    });
    this.total = total;
    this.page = pagination.page;
    this.limit = pagination.limit;
    this.totalPages = Math.ceil(total / pagination.limit);
    this.hasNext = this.page < this.totalPages;
    this.hasPrev = this.page > 1;
  }

  static fromItems<T>(
    items: T[],
    total: number,
    pagination: PaginationDTO
  ): PaginatedResponseDTO<T> {
    return new PaginatedResponseDTO(items, total, pagination);
  }

  toJSON(): Record<string, unknown> {
    return {
      ...super.toJSON(),
      total: this.total,
      page: this.page,
      limit: this.limit,
      totalPages: this.totalPages,
      hasNext: this.hasNext,
      hasPrev: this.hasPrev,
    };
  }
}
