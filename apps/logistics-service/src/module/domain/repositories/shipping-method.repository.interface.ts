import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { ShippingMethodEntity } from '../entities/shipping-method.entity';

export interface ShippingMethodRepository
  extends BaseRepository<ShippingMethodEntity, string> {
  findByType(type: string): Promise<readonly ShippingMethodEntity[]>;
  findActive(): Promise<readonly ShippingMethodEntity[]>;
}
