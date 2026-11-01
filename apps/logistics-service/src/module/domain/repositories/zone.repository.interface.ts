/**
 * Zone Repository Interface
 * @module logistics-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { ZoneEntity } from '../entities/zone.entity.js';
import type { ZoneIdVO } from '../value-objects/primitives/zone-id.vo.js';

export const ZONE_REPOSITORY = Symbol('ZONE_REPOSITORY');

export interface ZoneListFilter {
  readonly status?: string;
  readonly type?: string;
  readonly pricingType?: string;
  readonly parentId?: string;
  readonly codEnabled?: boolean;
  readonly isRemote?: boolean;
  readonly search?: string;
}

export interface ZoneListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'updatedAt' | 'name' | 'shippingCost';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: ZoneListFilter;
}

export interface ZonePaginationResult {
  readonly items: readonly ZoneEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface ZoneStats {
  readonly total: number;
  readonly byStatus: Readonly<Record<string, number>>;
  readonly byType: Readonly<Record<string, number>>;
  readonly codEnabledCount: number;
  readonly remoteCount: number;
}

export interface ZoneRepository extends BaseRepository<ZoneEntity, string> {
  findByIdVO(id: ZoneIdVO): Promise<ZoneEntity | null>;
  findByCode(code: string): Promise<ZoneEntity | null>;
  findByStatus(status: string): Promise<readonly ZoneEntity[]>;
  findByType(type: string): Promise<readonly ZoneEntity[]>;
  findByParentId(parentId: string): Promise<readonly ZoneEntity[]>;
  findByPostalCode(postalCode: string): Promise<readonly ZoneEntity[]>;
  findByDistrict(district: string): Promise<readonly ZoneEntity[]>;
  findByDivision(division: string): Promise<readonly ZoneEntity[]>;
  findActive(): Promise<readonly ZoneEntity[]>;
  findPaginated(options: ZoneListOptions): Promise<ZonePaginationResult>;
  getStats(): Promise<ZoneStats>;
  existsByCode(code: string): Promise<boolean>;
  softDelete(id: string, deletedBy?: string): Promise<void>;
}
