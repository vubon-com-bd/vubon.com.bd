/**
 * Zone Repository Interface
 * @module logistics-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { ZoneEntity } from '../entities/zone.entity.js';
import { ZoneIdVO } from '../value-objects/primitives/zone-id.vo.js';
import { ZoneStatusVO } from '../value-objects/primitives/zone-status.vo.js';
import { ZoneTypeVO } from '../value-objects/primitives/zone-type.vo.js';

export const ZONE_REPOSITORY = Symbol('ZONE_REPOSITORY');

export interface ZoneListFilter {
  readonly status?: string;
  readonly type?: string;
  readonly parentId?: string;
  readonly isRemote?: boolean;
  readonly search?: string;
}

export interface ZoneListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'name' | 'shippingCost';
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

export interface ZoneRepository extends BaseRepository<ZoneEntity, string> {
  findByIdVO(id: ZoneIdVO): Promise<ZoneEntity | null>;
  findByCode(code: string): Promise<ZoneEntity | null>;
  findByStatus(status: ZoneStatusVO): Promise<readonly ZoneEntity[]>;
  findByType(type: ZoneTypeVO): Promise<readonly ZoneEntity[]>;
  findActive(): Promise<readonly ZoneEntity[]>;
  findByParent(parentId: ZoneIdVO): Promise<readonly ZoneEntity[]>;
  findByPostalCode(code: string): Promise<ZoneEntity | null>;
  findByDistrict(district: string): Promise<ZoneEntity | null>;
  findByDivision(division: string): Promise<readonly ZoneEntity[]>;
  /** Find the best-matching zone for an address (postal → district → division). */
  findForAddress(input: { postalCode?: string; district?: string; division?: string }): Promise<ZoneEntity | null>;
  findPaginated(options: ZoneListOptions): Promise<ZonePaginationResult>;
  existsByCode(code: string): Promise<boolean>;
  softDelete(id: string, deletedBy?: string): Promise<void>;
}
