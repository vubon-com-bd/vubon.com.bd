import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { DeliveryMethodEntity } from '../../../domain/entities/delivery-method.entity';

export interface DeliveryMethodServiceInterface
  extends BaseServiceInterface<DeliveryMethodEntity, string> {
  listActive(): Promise<readonly DeliveryMethodEntity[]>;
  findById(methodId: string): Promise<DeliveryMethodEntity | null>;
}
