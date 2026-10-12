/**
 * Courier Repository Interface
 * @module logistics-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { CourierEntity } from '../entities/courier.entity.js';
import { CourierIdVO } from '../value-objects/primitives/courier-id.vo.js';
import { CourierStatusVO } from '../value-objects/primitives/courier-status.vo.js';
import { CourierTypeVO } from '../value-objects/primitives/courier-type.vo.js';
import { CourierNameVO } from '../value-objects/primitives/courier-name.vo.js';

export const COURIER_REPOSITORY = Symbol('COURIER_REPOSITORY');

export interface CourierListFilter {
  readonly status?: string;
  readonly type?: string;
  readonly supportsCOD?: boolean;
  readonly supportsInsurance?: boolean;
  readonly supportsInternational?: boolean;
  readonly zone?: string;
  readonly search?: string;
}

export interface CourierListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'priority' | 'averageDeliveryDays' | 'name';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: CourierListFilter;
}

export interface CourierPaginationResult {
  readonly items: readonly CourierEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface CourierRepository extends BaseRepository<CourierEntity, string> {
  findByIdVO(id: CourierIdVO): Promise<CourierEntity | null>;
  findByCode(code: CourierNameVO): Promise<CourierEntity | null>;
  findByStatus(status: CourierStatusVO): Promise<readonly CourierEntity[]>;
  findByType(type: CourierTypeVO): Promise<readonly CourierEntity[]>;
  findOperational(): Promise<readonly CourierEntity[]>;
  findDefault(): Promise<CourierEntity | null>;
  findCoveringZone(zone: string): Promise<readonly CourierEntity[]>;
  findPaginated(options: CourierListOptions): Promise<CourierPaginationResult>;
  existsByCode(code: CourierNameVO): Promise<boolean>;
  clearDefaultExcept(courierId: string): Promise<void>;
  softDelete(id: string, deletedBy?: string): Promise<void>;
}
