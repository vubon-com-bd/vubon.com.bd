/**
 * NotificationBuilderService
 * @module notification-service/domain/services
 *
 * Assembles a NotificationEntity from primitive inputs।
 * Real business logic — enforces domain invariants।
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { NotificationVO } from '@domain/composites/notification.vo.js';
import { NotificationContentVO } from '@domain/composites/notification-content.vo.js';
import { NotificationRecipientVO } from '@domain/composites/notification-recipient.vo.js';
import type { NotificationActionVO } from '@domain/composites/notification-action.vo.js';
import { NotificationEntity } from '@domain/entities/notification.entity.js';

import { NotificationIdVO } from '@domain/primitives/notification-id.vo.js';
import { NotificationTypeVO } from '@domain/primitives/notification-type.vo.js';
import { NotificationChannelVO } from '@domain/primitives/notification-channel.vo.js';
import { NotificationStatusVO } from '@domain/primitives/notification-status.vo.js';
import { NotificationPriorityVO } from '@domain/primitives/notification-priority.vo.js';
import { NotificationCategoryVO } from '@domain/primitives/notification-category.vo.js';
import { NotificationSubjectVO } from '@domain/primitives/notification-subject.vo.js';
import { NotificationBodyVO } from '@domain/primitives/notification-body.vo.js';
import { NotificationDataVO } from '@domain/primitives/notification-data.vo.js';
import { UserIdVO } from '@domain/primitives/user-id.vo.js';

export interface BuildNotificationInput {
  readonly id: string;
  readonly userId: string;
  readonly type: string;
  readonly category: string;
  readonly channel: string;
  readonly priority?: string;
  readonly subject: string;
  readonly body: string;
  readonly data?: Readonly<Record<string, unknown>>;
  readonly recipients: readonly NotificationRecipientVO[];
  readonly actions?: readonly NotificationActionVO[];
  readonly expiresAt?: string;
  readonly now: string;
}

export class NotificationBuilderService {
  static build(input: BuildNotificationInput): NotificationEntity {
    if (input.recipients.length === 0) {
      throw new BusinessRuleError(
        'Notification must have at least one recipient',
        'NOTIFICATION_NO_RECIPIENTS',
        { userId: input.userId },
      );
    }

    // Build primitives
    const id = NotificationIdVO.create(input.id);
    const userId = UserIdVO.create(input.userId);
    const type = NotificationTypeVO.create(input.type);
    const category = NotificationCategoryVO.create(input.category);
    const channel = NotificationChannelVO.create(input.channel);
    const status = NotificationStatusVO.pending();
    const priority = input.priority
      ? NotificationPriorityVO.create(input.priority)
      : NotificationPriorityVO.normal();

    // Build content
    const subject = NotificationSubjectVO.create(input.subject);
    const body = NotificationBodyVO.create(input.body);
    const data = NotificationDataVO.create(input.data);

    const content = NotificationContentVO.create({
      subject,
      body,
      data,
    });

    const vo = NotificationVO.create({
      id,
      userId,
      type,
      category,
      channel,
      priority,
      status,
      subject,
      body,
      data,
    });

    // Business rule: security/promotional consistency
    if (type.isSecurity() && priority.isSilent()) {
      throw new ValidationError(
        'Security notification cannot have silent priority',
        'priority',
      );
    }

    return NotificationEntity.create({
      id,
      vo,
      content,
      recipients: input.recipients,
      actions: input.actions ?? [],
      expiresAt: input.expiresAt,
      now: input.now,
    });
  }
}
