import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { DeliveryMethodServiceInterface } from '../interfaces/delivery-method.service.interface';
import type { DeliveryMethodRepository } from '../../../domain/repositories/delivery-method.repository.interface';
import { DeliveryMethodEntity } from '../../../domain/entities/delivery-method.entity';
import { DeliveryMethodIdVO } from '../../../domain/value-objects/primitives/delivery-method-id.vo';

@Injectable()
export class DeliveryMethodService
  extends BaseService<DeliveryMethodEntity, string>
  implements DeliveryMethodServiceInterface
{
  readonly name = 'DeliveryMethodService';

  constructor(
    private readonly methodRepo: DeliveryMethodRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async listActive(): Promise<readonly DeliveryMethodEntity[]> {
    return this.methodRepo.findActive();
  }

  async findById(methodId: string): Promise<DeliveryMethodEntity | null> {
    return this.methodRepo.findById(DeliveryMethodIdVO.create(methodId));
  }
}
