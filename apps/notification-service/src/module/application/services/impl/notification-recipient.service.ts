import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { NotificationRecipientServiceInterface } from '../interfaces/notification-recipient.service.interface';
import type { NotificationRecipientRepository } from '../../../domain/repositories/notification-recipient.repository.interface';
import { NotificationRecipientEntity } from '../../../domain/entities/notification-recipient.entity';
import { NotificationIdVO } from '../../../domain/value-objects/primitives/notification-id.vo';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';

@Injectable()
export class NotificationRecipientService
  extends BaseService<NotificationRecipientEntity, string>
  implements NotificationRecipientServiceInterface
{
  readonly name = 'NotificationRecipientService';

  constructor(private readonly repo: NotificationRecipientRepository) {
    super();
  }

  async findByNotificationId(notificationId: string): Promise<NotificationRecipientEntity | null> {
    return this.repo.findByNotificationId(NotificationIdVO.create(notificationId));
  }

  async findByUser(userId: string): Promise<readonly NotificationRecipientEntity[]> {
    return this.repo.findByUser(UserIdVO.create(userId));
  }
}
