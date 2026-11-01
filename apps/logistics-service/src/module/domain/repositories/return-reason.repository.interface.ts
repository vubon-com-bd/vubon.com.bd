/**
 * ReturnReason Repository Interface
 * @module logistics-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { ReturnReasonEntity } from '../entities/return-reason.entity.js';
import type { ReturnReasonIdVO } from '../value-objects/primitives/return-reason-id.vo.js';

export const RETURN_REASON_REPOSITORY = Symbol('RETURN_REASON_REPOSITORY');

export interface ReturnReasonListFilter {
  readonly isActive?: boolean;
  readonly type?: string;
  readonly faultCategory?: 'seller' | 'customer' | 'carrier' | 'other';
  readonly requiresPhoto?: boolean;
  readonly search?: string;
}

export interface ReturnReasonListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'priority' | 'createdAt' | 'code';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: ReturnReasonListFilter;
}

export interface ReturnReasonPaginationResult {
  readonly items: readonly ReturnReasonEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface ReturnReasonStats {
  readonly total: number;
  readonly activeCount: number;
  readonly byCategory: Readonly<Record<string, number>>;
}

export interface ReturnReasonRepository
  extends BaseRepository<ReturnReasonEntity, string> {
  findByIdVO(id: ReturnReasonIdVO): Promise<ReturnReasonEntity | null>;
  findByCode(code: string): Promise<ReturnReasonEntity | null>;
  findByType(type: string): Promise<readonly ReturnReasonEntity[]>;
  findActive(): Promise<readonly ReturnReasonEntity[]>;
  findPaginated(
    options: ReturnReasonListOptions,
  ): Promise<ReturnReasonPaginationResult>;
  getStats(): Promise<ReturnReasonStats>;
  existsByCode(code: string): Promise<boolean>;
  softDelete(id: string, deletedBy?: string): Promise<void>;
}
