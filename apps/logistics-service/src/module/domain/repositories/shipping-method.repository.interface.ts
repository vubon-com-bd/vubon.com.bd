/**
 * ShippingMethod Repository Interface
 * @module logistics-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { ShippingMethodEntity } from '../entities/shipping-method.entity.js';
import { ShippingMethodIdVO } from '../value-objects/primitives/shipping-method-id.vo.js';
import { ShippingMethodStatusVO } from '../value-objects/primitives/shipping-method-status.vo.js';
import { ShippingMethodValueVO } from '../value-objects/primitives/shipping-method-value.vo.js';

export const SHIPPING_METHOD_REPOSITORY = Symbol('SHIPPING_METHOD_REPOSITORY');

export interface ShippingMethodListFilter {
  readonly status?: string;
  readonly code?: string;
  readonly zoneId?: string;
  readonly codEnabled?: boolean;
  readonly search?: string;
}

export interface ShippingMethodListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'name' | 'baseCost';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: ShippingMethodListFilter;
}

export interface ShippingMethodPaginationResult {
  readonly items: readonly ShippingMethodEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface ShippingMethodRepository extends BaseRepository<ShippingMethodEntity, string> {
  findByIdVO(id: ShippingMethodIdVO): Promise<ShippingMethodEntity | null>;
  findByCode(code: ShippingMethodValueVO): Promise<ShippingMethodEntity | null>;
  findByStatus(status: ShippingMethodStatusVO): Promise<readonly ShippingMethodEntity[]>;
  findSelectable(): Promise<readonly ShippingMethodEntity[]>;
  findByZone(zoneId: string): Promise<readonly ShippingMethodEntity[]>;
  findDefault(): Promise<ShippingMethodEntity | null>;
  /** Selectable methods that can handle the given weight + zone. */
  findEligibleFor(zoneId: string, weightKg: number): Promise<readonly ShippingMethodEntity[]>;
  findPaginated(options: ShippingMethodListOptions): Promise<ShippingMethodPaginationResult>;
  existsByCode(code: ShippingMethodValueVO): Promise<boolean>;
  clearDefaultExcept(methodId: string): Promise<void>;
  softDelete(id: string, deletedBy?: string): Promise<void>;
}
