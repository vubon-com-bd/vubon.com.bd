import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { NotificationAttemptServiceInterface } from '../interfaces/notification-attempt.service.interface';
import type { NotificationAttemptRepository } from '../../../domain/repositories/notification-attempt.repository.interface';
import { NotificationAttemptEntity } from '../../../domain/entities/notification-attempt.entity';

@Injectable()
export class NotificationAttemptService
  extends BaseService<NotificationAttemptEntity, string>
  implements NotificationAttemptServiceInterface
{
  readonly name = 'NotificationAttemptService';

  constructor(private readonly repo: NotificationAttemptRepository) {
    super();
  }

  async findByDeliveryId(deliveryId: string): Promise<readonly NotificationAttemptEntity[]> {
    return this.repo.findByDeliveryId(deliveryId);
  }
}
