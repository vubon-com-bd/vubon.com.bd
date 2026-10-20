/**
 * Delivery Method Repository Interface
 * @module order-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { DeliveryMethodEntity } from '../entities/delivery-method.entity.js';
import type { DeliveryMethodIdVO } from '../value-objects/primitives/delivery-method-id.vo.js';

// ─── DI Token ──────────────────────────────
export const DELIVERY_METHOD_REPOSITORY = Symbol('DELIVERY_METHOD_REPOSITORY');

// ─── Filter ────────────────────────────────
export interface DeliveryMethodListFilter {
  readonly type?: string;
  readonly isActive?: boolean;
  readonly maxCost?: number;
  readonly maxDays?: number;
}

// ─── Main Interface ────────────────────────
export interface DeliveryMethodRepository
  extends BaseRepository<DeliveryMethodEntity, string> {
  findByIdVO(id: DeliveryMethodIdVO): Promise<DeliveryMethodEntity | null>;
  findActive(): Promise<readonly DeliveryMethodEntity[]>;
  findByType(type: string): Promise<readonly DeliveryMethodEntity[]>;
  findFree(): Promise<readonly DeliveryMethodEntity[]>;
  findFast(maxDays?: number): Promise<readonly DeliveryMethodEntity[]>;
  softDelete(id: string, deletedBy?: string): Promise<void>;
}
