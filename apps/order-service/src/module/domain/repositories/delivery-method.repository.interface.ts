/**
 * Delivery Method Repository Interface
 * @module order-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { DeliveryMethodEntity } from '../entities/delivery-method.entity.js';
import { DeliveryMethodIdVO } from '../value-objects/primitives/delivery-method-id.vo.js';
import { DeliveryMethodTypeVO } from '../value-objects/primitives/delivery-method-type.vo.js';

export const DELIVERY_METHOD_REPOSITORY = Symbol('DELIVERY_METHOD_REPOSITORY');

export interface DeliveryMethodRepository
  extends BaseRepository<DeliveryMethodEntity, string> {
  findByIdVO(id: DeliveryMethodIdVO): Promise<DeliveryMethodEntity | null>;
  findByName(name: string): Promise<DeliveryMethodEntity | null>;
  findByType(type: DeliveryMethodTypeVO): Promise<readonly DeliveryMethodEntity[]>;
  findActive(): Promise<readonly DeliveryMethodEntity[]>;
  findActiveByType(
    type: DeliveryMethodTypeVO,
  ): Promise<readonly DeliveryMethodEntity[]>;
  existsByName(name: string): Promise<boolean>;
}
