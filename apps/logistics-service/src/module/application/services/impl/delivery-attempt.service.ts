import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { DeliveryAttemptServiceInterface } from '../interfaces/delivery-attempt.service.interface';
import type { DeliveryAttemptRepository } from '../../../domain/repositories/delivery-attempt.repository.interface';
import type { DeliveryAttemptEntity } from '../../../domain/entities/delivery-attempt.entity';
import { DeliveryIdVO } from '../../../domain/value-objects/primitives/delivery-id.vo';

@Injectable()
export class DeliveryAttemptService
  extends BaseService<DeliveryAttemptEntity, string>
  implements DeliveryAttemptServiceInterface
{
  readonly name = 'DeliveryAttemptService';

  constructor(private readonly repo: DeliveryAttemptRepository) {
    super();
  }

  async listByDelivery(deliveryId: string): Promise<readonly DeliveryAttemptEntity[]> {
    return this.repo.findByDelivery(DeliveryIdVO.create(deliveryId));
  }

  async countByDelivery(deliveryId: string): Promise<number> {
    return this.repo.countByDelivery(DeliveryIdVO.create(deliveryId));
  }
}
