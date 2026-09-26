import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { DeliveryMethodEntity } from '../entities/delivery-method.entity';
import { DeliveryMethodIdVO } from '../value-objects/primitives/delivery-method-id.vo';

export interface DeliveryMethodRepository
  extends BaseRepository<DeliveryMethodEntity, DeliveryMethodIdVO> {
  findActive(): Promise<readonly DeliveryMethodEntity[]>;
}
