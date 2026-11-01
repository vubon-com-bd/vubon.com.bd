/**
 * ShippingMethod Repository Interface
 * @module logistics-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { ShippingMethodEntity } from '../entities/shipping-method.entity.js';
import type { ShippingMethodIdVO } from '../value-objects/primitives/shipping-method-id.vo.js';

export const SHIPPING_METHOD_REPOSITORY = Symbol('SHIPPING_METHOD_REPOSITORY');

export interface ShippingMethodListFilter {
  readonly status?: string;
  readonly type?: string;
  readonly rateType?: string;
  readonly codEnabled?: boolean;
  readonly trackingEnabled?: boolean;
  readonly zone?: string;
  readonly minWeightKg?: number;
  readonly maxWeightKg?: number;
  readonly search?: string;
}

export interface ShippingMethodListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'updatedAt' | 'baseCost' | 'minDeliveryDays';
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

export interface ShippingMethodStats {
  readonly total: number;
  readonly byStatus: Readonly<Record<string, number>>;
  readonly byType: Readonly<Record<string, number>>;
  readonly codEnabledCount: number;
  readonly trackingEnabledCount: number;
}

export interface ShippingMethodRepository
  extends BaseRepository<ShippingMethodEntity, string> {
  findByIdVO(id: ShippingMethodIdVO): Promise<ShippingMethodEntity | null>;
  findByCode(code: string): Promise<ShippingMethodEntity | null>;
  findByStatus(status: string): Promise<readonly ShippingMethodEntity[]>;
  findByType(type: string): Promise<readonly ShippingMethodEntity[]>;
  findByZone(zone: string): Promise<readonly ShippingMethodEntity[]>;
  findDefault(): Promise<ShippingMethodEntity | null>;
  findUsable(): Promise<readonly ShippingMethodEntity[]>;
  findPaginated(options: ShippingMethodListOptions): Promise<ShippingMethodPaginationResult>;
  getStats(): Promise<ShippingMethodStats>;
  existsByCode(code: string): Promise<boolean>;
  softDelete(id: string, deletedBy?: string): Promise<void>;
}
