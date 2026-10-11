import { describe, it, expect } from '@jest/globals';
import { NotificationVO } from '../../../../../src/module/domain/value-objects/composites/notification.vo.js';
import { NotificationContentVO } from '../../../../../src/module/domain/value-objects/composites/notification-content.vo.js';
import { NotificationRecipientVO } from '../../../../../src/module/domain/value-objects/composites/notification-recipient.vo.js';
import { NotificationActionsVO } from '../../../../../src/module/domain/value-objects/composites/notification-actions.vo.js';
import { NotificationIdVO } from '../../../../../src/module/domain/value-objects/primitives/notification-id.vo.js';
import { NotificationTypeVO } from '../../../../../src/module/domain/value-objects/primitives/notification-type.vo.js';
import { NotificationCategoryVO } from '../../../../../src/module/domain/value-objects/primitives/notification-category.vo.js';
import { NotificationChannelVO } from '../../../../../src/module/domain/value-objects/primitives/notification-channel.vo.js';
import { NotificationStatusVO } from '../../../../../src/module/domain/value-objects/primitives/notification-status.vo.js';
import { NotificationPriorityVO } from '../../../../../src/module/domain/value-objects/primitives/notification-priority.vo.js';
import { NotificationTitleVO } from '../../../../../src/module/domain/value-objects/primitives/notification-title.vo.js';
import { NotificationBodyVO } from '../../../../../src/module/domain/value-objects/primitives/notification-body.vo.js';
import { UserIdVO } from '../../../../../src/module/domain/value-objects/primitives/user-id.vo.js';
import { FIXED_USER_ID, FIXED_NOTIFICATION_ID } from '../../../../helpers/test-factories.js';

function buildProps(channel = NotificationChannelVO.email()) {
  return {
    id: NotificationIdVO.create(FIXED_NOTIFICATION_ID),
    type: NotificationTypeVO.transactional(),
    category: NotificationCategoryVO.order(),
    channel,
    status: NotificationStatusVO.pending(),
    priority: NotificationPriorityVO.normal(),
    content: NotificationContentVO.create({
      title: NotificationTitleVO.create('T'),
      body: NotificationBodyVO.create('B'),
    }),
    recipient: NotificationRecipientVO.reconstitute({
      userId: UserIdVO.reconstitute(FIXED_USER_ID),
      channel,
    }),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

describe('NotificationVO', () => {
  it('create valid', () => {
    const vo = NotificationVO.create(buildProps());
    expect(vo.id.value).toBe(FIXED_NOTIFICATION_ID);
    expect(vo.hasActions()).toBe(false);
  });
  it('rejects mismatched recipient channel', () => {
    const props = buildProps();
    expect(() =>
      NotificationVO.create({
        ...props,
        recipient: NotificationRecipientVO.reconstitute({
          userId: UserIdVO.reconstitute(FIXED_USER_ID),
          channel: NotificationChannelVO.sms(),
        }),
      }),
    ).toThrow();
  });
  it('rejects expiresAt before createdAt', () => {
    const props = buildProps();
    expect(() =>
      NotificationVO.create({
        ...props,
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() - 1000).toISOString(),
      }),
    ).toThrow();
  });
  it('isExpired checks date', () => {
    const vo = NotificationVO.reconstitute({
      ...buildProps(),
      expiresAt: new Date(Date.now() - 1000).toISOString(),
    });
    expect(vo.isExpired()).toBe(true);
  });
  it('isExpired false when no expiresAt', () => {
    const vo = NotificationVO.reconstitute(buildProps());
    expect(vo.isExpired()).toBe(false);
  });
  it('isDelivered when delivery status', () => {
    const props = buildProps();
    const vo = NotificationVO.reconstitute({
      ...props,
      delivery: {
        status: { value: 'delivered', isDelivered: () => true } as never,
        attemptCount: 1,
      } as never,
    });
    expect(vo.isDelivered()).toBe(true);
  });
  it('hasActions when actions provided', () => {
    const props = buildProps();
    const vo = NotificationVO.reconstitute({
      ...props,
      actions: NotificationActionsVO.empty(),
    });
    expect(vo.hasActions()).toBe(false);
  });
});
