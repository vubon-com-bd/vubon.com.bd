/**
 * Courier Repository Interface
 * @module logistics-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { CourierEntity } from '../entities/courier.entity.js';
import type { CourierIdVO } from '../value-objects/primitives/courier-id.vo.js';

export const COURIER_REPOSITORY = Symbol('COURIER_REPOSITORY');

export interface CourierListFilter {
  readonly status?: string;
  readonly type?: string;
  readonly supportsCOD?: boolean;
  readonly supportsInsurance?: boolean;
  readonly supportsInternational?: boolean;
  readonly apiEnabled?: boolean;
  readonly isDefault?: boolean;
  readonly zone?: string;
  readonly search?: string;
}

export interface CourierListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'updatedAt' | 'priority' | 'averageDeliveryDays';
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

export interface CourierStats {
  readonly total: number;
  readonly byStatus: Readonly<Record<string, number>>;
  readonly byType: Readonly<Record<string, number>>;
  readonly codEnabled: number;
  readonly insuranceEnabled: number;
  readonly internationalEnabled: number;
  readonly apiEnabledCount: number;
}

export interface CourierRepository extends BaseRepository<CourierEntity, string> {
  findByIdVO(id: CourierIdVO): Promise<CourierEntity | null>;
  findByCode(code: string): Promise<CourierEntity | null>;
  findByStatus(status: string): Promise<readonly CourierEntity[]>;
  findByType(type: string): Promise<readonly CourierEntity[]>;
  findDefault(): Promise<CourierEntity | null>;
  findOperational(): Promise<readonly CourierEntity[]>;
  findSupportingCOD(): Promise<readonly CourierEntity[]>;
  findSupportingInsurance(): Promise<readonly CourierEntity[]>;
  findSupportingInternational(): Promise<readonly CourierEntity[]>;
  findByZone(zone: string): Promise<readonly CourierEntity[]>;
  findPaginated(options: CourierListOptions): Promise<CourierPaginationResult>;
  getStats(): Promise<CourierStats>;
  existsByCode(code: string): Promise<boolean>;
  softDelete(id: string, deletedBy?: string): Promise<void>;
}
