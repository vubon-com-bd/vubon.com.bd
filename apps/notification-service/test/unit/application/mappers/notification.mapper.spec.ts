import { describe, it, expect } from '@jest/globals';
import { NotificationMapper } from '../../../../src/module/application/mappers/notification.mapper.js';
import { NotificationEntity } from '../../../../src/module/domain/entities/notification.entity.js';
import { NotificationTypeVO } from '../../../../src/module/domain/value-objects/primitives/notification-type.vo.js';
import { NotificationCategoryVO } from '../../../../src/module/domain/value-objects/primitives/notification-category.vo.js';
import { NotificationChannelVO } from '../../../../src/module/domain/value-objects/primitives/notification-channel.vo.js';
import { NotificationPriorityVO } from '../../../../src/module/domain/value-objects/primitives/notification-priority.vo.js';
import { NotificationTitleVO } from '../../../../src/module/domain/value-objects/primitives/notification-title.vo.js';
import { NotificationBodyVO } from '../../../../src/module/domain/value-objects/primitives/notification-body.vo.js';
import { UserIdVO } from '../../../../src/module/domain/value-objects/primitives/user-id.vo.js';
import { NotificationActionVO } from '../../../../src/module/domain/value-objects/primitives/notification-action.vo.js';
import { NotificationActionTypeVO } from '../../../../src/module/domain/value-objects/primitives/notification-action-type.vo.js';
import { ActionUrlVO } from '../../../../src/module/domain/value-objects/primitives/action-url.vo.js';
import { DeliveryFailureReasonVO } from '../../../../src/module/domain/value-objects/primitives/delivery-failure-reason.vo.js';
import { NotificationContentVO } from '../../../../src/module/domain/value-objects/composites/notification-content.vo.js';
import { NotificationRecipientVO } from '../../../../src/module/domain/value-objects/composites/notification-recipient.vo.js';
import { NotificationActionsVO } from '../../../../src/module/domain/value-objects/composites/notification-actions.vo.js';
import { NotificationActionEntryVO } from '../../../../src/module/domain/value-objects/composites/notification-action-entry.vo.js';
import { NotificationReferenceVO } from '../../../../src/module/domain/value-objects/composites/notification-reference.vo.js';
import { FIXED_USER_ID, FIXED_NOTIFICATION_ID } from '../../../helpers/test-factories.js';

function build(opts: { withActions?: boolean; withReference?: boolean; failed?: boolean } = {}): NotificationEntity {
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
      imageUrl: 'https://x.com/i.png',
      iconUrl: 'https://x.com/ic.png',
      data: { orderId: '1' },
      actions: opts.withActions
        ? NotificationActionsVO.create([
            NotificationActionEntryVO.reconstitute({
              action: NotificationActionVO.view(),
              type: NotificationActionTypeVO.primary(),
              label: 'View',
              url: ActionUrlVO.create('https://x.com/orders/1'),
              payload: { k: 'v' },
            }),
          ])
        : undefined,
      reference: opts.withReference
        ? NotificationReferenceVO.create({ type: 'order', id: '1', url: 'https://x.com/o/1' })
        : undefined,
    },
  });
  if (opts.failed) {
    e.queue();
    e.startSending('smtp');
    e.fail(DeliveryFailureReasonVO.timeout());
  }
  return e;
}

describe('NotificationMapper', () => {
  describe('toResponse', () => {
    it('maps full entity with all fields', () => {
      const r = NotificationMapper.toResponse(build({ withActions: true, withReference: true }));
      expect(r.id).toBe(FIXED_NOTIFICATION_ID);
      expect(r.imageUrl).toBe('https://x.com/i.png');
      expect(r.iconUrl).toBe('https://x.com/ic.png');
      expect(r.actions?.length).toBe(1);
      expect(r.actions?.[0]?.label).toBe('View');
      expect(r.actions?.[0]?.url).toBe('https://x.com/orders/1');
      expect(r.reference?.type).toBe('order');
      expect(r.reference?.url).toBe('https://x.com/o/1');
      expect(r.data).toEqual({ orderId: '1' });
    });

    it('maps minimal entity', () => {
      const r = NotificationMapper.toResponse(build());
      expect(r.actions).toBeUndefined();
      expect(r.reference).toBeUndefined();
      expect(r.delivery).toBeDefined();
      expect(r.read).toBeDefined();
    });

    it('maps failed entity with delivery failure info', () => {
      const r = NotificationMapper.toResponse(build({ failed: true }));
      expect(r.delivery?.status).toBeDefined();
      expect(r.delivery?.failureReason).toBe('timeout');
      expect(r.status).toBe('failed');
    });
  });

  describe('toPublicResponse', () => {
    it('returns public DTO', () => {
      const r = NotificationMapper.toPublicResponse(build({ withActions: true }));
      expect(r.id).toBe(FIXED_NOTIFICATION_ID);
      expect(r.actions?.length).toBe(1);
    });
  });

  describe('toSummary', () => {
    it('returns summary', () => {
      const r = NotificationMapper.toSummary(build());
      expect(r.id).toBe(FIXED_NOTIFICATION_ID);
      expect(r.isRead).toBe(false);
    });
  });

  describe('toListResponse', () => {
    it('returns paginated list', () => {
      const r = NotificationMapper.toListResponse([build(), build()], 2, 1, 20, 1);
      expect(r.items.length).toBe(2);
      expect(r.total).toBe(2);
      expect(r.totalPages).toBe(1);
      expect(r.unreadCount).toBe(1);
    });
  });

  describe('toDetail', () => {
    it('returns detail wrapper', () => {
      const r = NotificationMapper.toDetail(build());
      expect(r.notification.id).toBe(FIXED_NOTIFICATION_ID);
      expect(r.attempts).toEqual([]);
    });
  });

  describe('toSendResponse', () => {
    it('returns send response', () => {
      const r = NotificationMapper.toSendResponse(build());
      expect(r.success).toBe(true);
      expect(r.notificationId).toBe(FIXED_NOTIFICATION_ID);
    });
  });
});
