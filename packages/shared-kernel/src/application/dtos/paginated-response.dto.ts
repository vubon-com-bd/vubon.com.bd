/**
 * Paginated Response DTO
 * @module shared-kernel/application/dtos
 *
 * References sibling DTOs।
 */
import { PaginationDTO } from './pagination.dto';
import { BaseResponseDTO } from './base-response.dto';

export interface PaginationMeta {
  readonly page: number;
  readonly limit: number;
  readonly total: number;
  readonly totalPages: number;
  readonly hasNext: boolean;
  readonly hasPrev: boolean;
}

export class PaginatedResponseDTO<T> extends BaseResponseDTO<readonly T[]> {
  meta!: PaginationMeta;

  static of<T>(
    items: readonly T[],
    total: number,
    pagination: PaginationDTO
  ): PaginatedResponseDTO<T> {
    const dto = new PaginatedResponseDTO<T>();
    dto.success = true;
    dto.data = items;
    dto.meta = {
      page: pagination.page,
      limit: pagination.limit,
      total,
      totalPages: Math.ceil(total / pagination.limit),
      hasNext: pagination.page * pagination.limit < total,
      hasPrev: pagination.page > 1,
    };
    return dto;
  }
}
