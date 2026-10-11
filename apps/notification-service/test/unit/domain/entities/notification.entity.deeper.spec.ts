/**
 * Deeper coverage for NotificationEntity — archive/snooze/star/expire paths
 */
import { describe, it, expect } from '@jest/globals';
import { NotificationEntity } from '../../../../src/module/domain/entities/notification.entity.js';
import { NotificationTypeVO } from '../../../../src/module/domain/value-objects/primitives/notification-type.vo.js';
import { NotificationCategoryVO } from '../../../../src/module/domain/value-objects/primitives/notification-category.vo.js';
import { NotificationChannelVO } from '../../../../src/module/domain/value-objects/primitives/notification-channel.vo.js';
import { NotificationPriorityVO } from '../../../../src/module/domain/value-objects/primitives/notification-priority.vo.js';
import { NotificationTitleVO } from '../../../../src/module/domain/value-objects/primitives/notification-title.vo.js';
import { NotificationBodyVO } from '../../../../src/module/domain/value-objects/primitives/notification-body.vo.js';
import { NotificationDataVO } from '../../../../src/module/domain/value-objects/primitives/notification-data.vo.js';
import { UserIdVO } from '../../../../src/module/domain/value-objects/primitives/user-id.vo.js';
import { NotificationContentVO } from '../../../../src/module/domain/value-objects/composites/notification-content.vo.js';
import { NotificationRecipientVO } from '../../../../src/module/domain/value-objects/composites/notification-recipient.vo.js';
import { NotificationActionsVO } from '../../../../src/module/domain/value-objects/composites/notification-actions.vo.js';
import { NotificationActionEntryVO } from '../../../../src/module/domain/value-objects/composites/notification-action-entry.vo.js';
import { NotificationActionVO } from '../../../../src/module/domain/value-objects/primitives/notification-action.vo.js';
import { NotificationActionTypeVO } from '../../../../src/module/domain/value-objects/primitives/notification-action-type.vo.js';
import { NotificationReferenceVO } from '../../../../src/module/domain/value-objects/composites/notification-reference.vo.js';
import { FIXED_USER_ID, FIXED_NOTIFICATION_ID } from '../../../helpers/test-factories.js';

function build(opts: { withActions?: boolean; withReference?: boolean } = {}): NotificationEntity {
  const ch = NotificationChannelVO.email();
  return NotificationEntity.create({
    id: FIXED_NOTIFICATION_ID,
    now: new Date().toISOString(),
    props: {
      type: NotificationTypeVO.transactional(),
      category: NotificationCategoryVO.order(),
      channel: ch,
      priority: NotificationPriorityVO.normal(),
      content: NotificationContentVO.create({
        title: NotificationTitleVO.create('T'),
        body: NotificationBodyVO.create('B'),
        data: NotificationDataVO.create({ orderId: '1' }),
      }),
      recipient: NotificationRecipientVO.reconstitute({
        userId: UserIdVO.reconstitute(FIXED_USER_ID),
        channel: ch,
      }),
      data: { orderId: '1' },
      actions: opts.withActions
        ? NotificationActionsVO.create([
            NotificationActionEntryVO.reconstitute({
              action: NotificationActionVO.view(),
              type: NotificationActionTypeVO.primary(),
              label: 'View',
              url: { value: 'https://x.com' } as never,
            }),
          ])
        : undefined,
      reference: opts.withReference
        ? NotificationReferenceVO.create({ type: 'order', id: '123' })
        : undefined,
      imageUrl: 'https://img.com/i.png',
      iconUrl: 'https://img.com/icon.png',
      metadata: { key: 'value' },
      expiresAt: new Date(Date.now() + 86_400_000).toISOString(),
    },
  });
}

describe('NotificationEntity deeper coverage', () => {
  it('imageUrl/iconUrl/data/reference getters', () => {
    const e = build({ withReference: true });
    expect(e.imageUrl).toBe('https://img.com/i.png');
    expect(e.iconUrl).toBe('https://img.com/icon.png');
    expect(e.data).toEqual({ orderId: '1' });
    expect(e.reference?.type).toBe('order');
  });

  it('actions getter when present', () => {
    const e = build({ withActions: true });
    expect(e.actions?.count).toBe(1);
  });

  it('metadata getter', () => {
    const e = build();
    expect(e.metadata).toEqual({ key: 'value' });
  });

  it('expiresAt getter', () => {
    const e = build();
    expect(e.expiresAt).toBeDefined();
  });

  it('toIdVO returns VO', () => {
    const e = build();
    expect(e.toIdVO.value).toBe(FIXED_NOTIFICATION_ID);
  });

  it('userId getter', () => {
    const e = build();
    expect(e.userId.value).toBe(FIXED_USER_ID);
  });

  it('isExpiredAt respects expiresAt', () => {
    const e = build();
    const future = new Date(Date.now() + 2 * 86_400_000);
    expect(e.isExpiredAt(future)).toBe(true);
  });

  it('queue → schedule → cancel path', () => {
    const e = build();
    e.schedule(new Date(Date.now() + 3600_000).toISOString());
    expect(e.isScheduled()).toBe(true);
    e.cancel('changed');
    expect(e.isCancelled()).toBe(true);
  });

  it('retry resets failureReason + failedAt', () => {
    const e = build();
    e.queue();
    e.startSending('smtp');
    e.fail({ value: 'timeout' } as never);
    expect(e.failureReason).toBeDefined();
    e.retry();
    expect(e.failureReason).toBeUndefined();
    expect(e.failedAt).toBeUndefined();
  });

  it('markSent stores providerMessageId', () => {
    const e = build();
    e.queue();
    e.startSending('smtp');
    e.markSent('provider-msg-abc');
    expect(e.providerMessageId).toBe('provider-msg-abc');
  });

  it('provider getter set by startSending', () => {
    const e = build();
    e.queue();
    e.startSending('sendgrid');
    expect(e.provider).toBe('sendgrid');
  });

  it('deliveryAttempts incremented by startSending', () => {
    const e = build();
    e.queue();
    e.startSending('smtp');
    expect(e.deliveryAttempts).toBe(1);
  });

  it('metadata undefined when not passed', () => {
    const ch = NotificationChannelVO.email();
    const e = NotificationEntity.create({
      id: FIXED_NOTIFICATION_ID,
      now: new Date().toISOString(),
      props: {
        type: NotificationTypeVO.transactional(),
        category: NotificationCategoryVO.order(),
        channel: ch,
        priority: NotificationPriorityVO.normal(),
        content: NotificationContentVO.create({
          title: NotificationTitleVO.create('T'),
          body: NotificationBodyVO.create('B'),
        }),
        recipient: NotificationRecipientVO.reconstitute({
          userId: UserIdVO.reconstitute(FIXED_USER_ID),
          channel: ch,
        }),
      },
    });
    expect(e.metadata).toBeUndefined();
    expect(e.imageUrl).toBeUndefined();
    expect(e.actions).toBeUndefined();
    expect(e.reference).toBeUndefined();
    expect(e.expiresAt).toBeUndefined();
  });

  it('reconstitute accepts version', () => {
    const e = build();
    const re = NotificationEntity.reconstitute({
      id: e.id,
      createdAt: e.createdAt,
      updatedAt: e.updatedAt,
      props: {
        type: e.type,
        category: e.category,
        channel: e.channel,
        status: e.status,
        priority: e.priority,
        content: e.content,
        recipient: e.recipient,
      },
      version: 5,
    });
    expect(re.version).toBe(5);
  });

  it('rejects expiresAt before createdAt', () => {
    const ch = NotificationChannelVO.email();
    expect(() =>
      NotificationEntity.create({
        id: FIXED_NOTIFICATION_ID,
        now: new Date().toISOString(),
        props: {
          type: NotificationTypeVO.transactional(),
          category: NotificationCategoryVO.order(),
          channel: ch,
          priority: NotificationPriorityVO.normal(),
          content: NotificationContentVO.create({
            title: NotificationTitleVO.create('T'),
            body: NotificationBodyVO.create('B'),
          }),
          recipient: NotificationRecipientVO.reconstitute({
            userId: UserIdVO.reconstitute(FIXED_USER_ID),
            channel: ch,
          }),
          expiresAt: new Date(Date.now() - 1000).toISOString(),
        },
      }),
    ).toThrow();
  });
});
