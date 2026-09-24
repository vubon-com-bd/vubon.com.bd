import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { NotificationContentServiceInterface } from '../interfaces/notification-content.service.interface';
import type { NotificationContentRepository } from '../../../domain/repositories/notification-content.repository.interface';
import { NotificationContentEntity } from '../../../domain/entities/notification-content.entity';
import { NotificationIdVO } from '../../../domain/value-objects/primitives/notification-id.vo';

@Injectable()
export class NotificationContentService
  extends BaseService<NotificationContentEntity, string>
  implements NotificationContentServiceInterface
{
  readonly name = 'NotificationContentService';

  constructor(private readonly repo: NotificationContentRepository) {
    super();
  }

  async findByNotificationId(notificationId: string): Promise<NotificationContentEntity | null> {
    return this.repo.findByNotificationId(NotificationIdVO.create(notificationId));
  }
}
