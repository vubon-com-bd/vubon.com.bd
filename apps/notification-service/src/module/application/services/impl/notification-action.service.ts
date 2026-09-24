import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { NotificationActionServiceInterface } from '../interfaces/notification-action.service.interface';
import type { NotificationActionRepository } from '../../../domain/repositories/notification-action.repository.interface';
import { NotificationActionEntity } from '../../../domain/entities/notification-action.entity';
import { NotificationIdVO } from '../../../domain/value-objects/primitives/notification-id.vo';

@Injectable()
export class NotificationActionService
  extends BaseService<NotificationActionEntity, string>
  implements NotificationActionServiceInterface
{
  readonly name = 'NotificationActionService';

  constructor(private readonly repo: NotificationActionRepository) {
    super();
  }

  async findByNotificationId(notificationId: string): Promise<readonly NotificationActionEntity[]> {
    return this.repo.findByNotificationId(NotificationIdVO.create(notificationId));
  }
}
