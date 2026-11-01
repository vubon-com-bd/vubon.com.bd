/**
 * Notification Lifecycle E2E
 * @module notification-service/test/e2e/domain
 *
 * Full aggregate flow: draft → pending → queued → sending → sent → delivered → archived
 */
import { NotificationEntity } from '@domain/entities/notification.entity.js';
import { NotificationVO } from '@domain/composites/notification.vo.js';
import { NotificationContentVO } from '@domain/composites/notification-content.vo.js';
import { NotificationRecipientVO } from '@domain/composites/notification-recipient.vo.js';
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
import { EmailAddressVO } from '@domain/primitives/email-address.vo.js';

import { NotificationBuilderService } from '@domain/services/notification-builder.service.js';
import { ChannelSelectorService } from '@domain/services/channel-selector.service.js';
import { PriorityCalculatorService } from '@domain/services/priority-calculator.service.js';
import { PreferenceVO } from '@domain/composites/preference.vo.js';
import { PreferenceIdVO } from '@domain/primitives/preference-id.vo.js';
import { PreferenceTypeVO } from '@domain/primitives/preference-type.vo.js';
import { PreferenceOptionVO } from '@domain/primitives/preference-option.vo.js';
import { RecipientResolverService } from '@domain/services/recipient-resolver.service.js';
import { CanSendSpecification } from '@domain/specifications/can-send.specification.js';

import { IDS } from '@domain-fixtures/ids.fixture.js';

const NOW = new Date().toISOString();

describe('Notification Lifecycle — E2E', () => {
  it('full happy path: build → queue → send → deliver → archive', () => {
    // 1. Resolve recipients
    const resolverResult = RecipientResolverService.resolve([
      { userId: IDS.userId, channel: 'email', email: 'u@example.com' },
    ]);
    expect(resolverResult.resolved.length).toBe(1);

    // 2. Select channel (with real preference)
    const preference = PreferenceVO.create({
      id: PreferenceIdVO.create(IDS.preferenceId),
      userId: UserIdVO.create(IDS.userId),
      type: PreferenceTypeVO.create('channel_specific'),
      options: [
        PreferenceOptionVO.create({ channel: 'email', enabled: true }),
        PreferenceOptionVO.create({ channel: 'sms', enabled: true }),
        PreferenceOptionVO.create({ channel: 'push', enabled: true }),
      ],
      quietHoursEnabled: false,
      timezone: 'UTC',
      locale: 'en',
      locked: false,
    });
    const channelResult = ChannelSelectorService.select({
      type: NotificationTypeVO.transactional(),
      category: NotificationCategoryVO.create('order'),
      priority: NotificationPriorityVO.normal(),
      preference,
    });
    expect(channelResult.primary).toBeDefined();

    // 3. Compute priority
    const priorityResult = PriorityCalculatorService.calculate({
      priority: NotificationPriorityVO.normal(),
      category: NotificationCategoryVO.create('order'),
      channel: NotificationChannelVO.email(),
    });
    expect(priorityResult.score).toBeGreaterThan(0);

    // 4. Build notification
    const entity = NotificationBuilderService.build({
      id: IDS.notificationId,
      userId: IDS.userId,
      type: 'transactional',
      category: 'order',
      channel: 'email',
      subject: 'Order confirmed',
      body: 'Your order #123 is confirmed',
      data: { orderId: 'ORD-123' },
      recipients: resolverResult.resolved,
      now: NOW,
    });

    // 5. Verify CanSend
    expect(CanSendSpecification.strict().isSatisfiedBy({ notification: entity })).toBe(true);

    // 6. Execute lifecycle
    entity.queue(NOW);
    expect(entity.isQueued()).toBe(true);

    entity.markSending(NOW);
    expect(entity.isSending()).toBe(true);

    entity.markSent(NOW);
    expect(entity.isSent()).toBe(true);
    expect(entity.sentAt).toBe(NOW);

    entity.markDelivered(NOW);
    expect(entity.isDelivered()).toBe(true);
    expect(entity.deliveredAt).toBe(NOW);

    entity.archive(NOW);
    expect(entity.isArchived()).toBe(true);
    expect(entity.isTerminal()).toBe(true);

    // 7. Check events emitted
    const events = entity.pullDomainEvents();
    expect(events.length).toBeGreaterThan(3);
  });

  it('failure path: build → send attempt → fail → retry via pending', () => {
    const entity = NotificationBuilderService.build({
      id: IDS.notificationId,
      userId: IDS.userId,
      type: 'transactional',
      category: 'order',
      channel: 'email',
      subject: 'Alert',
      body: 'Body',
      recipients: [
        NotificationRecipientVO.create({
          userId: UserIdVO.create(IDS.userId),
          channel: NotificationChannelVO.email(),
          email: EmailAddressVO.create('u@example.com'),
        }),
      ],
      now: NOW,
    });

    entity.queue(NOW);
    entity.markSending(NOW);
    entity.markFailed('provider timeout', NOW);
    expect(entity.isFailed()).toBe(true);

    // Retry path
    expect(entity.canBeRetried()).toBe(true);
  });

  it('cancellation path: build → queue → cancel', () => {
    const entity = NotificationBuilderService.build({
      id: IDS.notificationId,
      userId: IDS.userId,
      type: 'transactional',
      category: 'order',
      channel: 'email',
      subject: 'S',
      body: 'B',
      recipients: [
        NotificationRecipientVO.create({
          userId: UserIdVO.create(IDS.userId),
          channel: NotificationChannelVO.email(),
          email: EmailAddressVO.create('u@example.com'),
        }),
      ],
      now: NOW,
    });

    entity.queue(NOW);
    entity.cancel('user requested', IDS.userId, NOW);
    expect(entity.isCancelled()).toBe(true);
    expect(entity.cancelledReason).toBe('user requested');
  });
});
