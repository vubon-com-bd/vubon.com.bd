import { describe, it, expect } from '@jest/globals';
import { DeliveryService } from '../../../../src/module/application/services/impl/delivery.service.js';
import { NotificationEntity } from '../../../../src/module/domain/entities/notification.entity.js';
import { NotificationTypeVO } from '../../../../src/module/domain/value-objects/primitives/notification-type.vo.js';
import { NotificationCategoryVO } from '../../../../src/module/domain/value-objects/primitives/notification-category.vo.js';
import { NotificationChannelVO } from '../../../../src/module/domain/value-objects/primitives/notification-channel.vo.js';
import { NotificationPriorityVO } from '../../../../src/module/domain/value-objects/primitives/notification-priority.vo.js';
import { NotificationTitleVO } from '../../../../src/module/domain/value-objects/primitives/notification-title.vo.js';
import { NotificationBodyVO } from '../../../../src/module/domain/value-objects/primitives/notification-body.vo.js';
import { UserIdVO } from '../../../../src/module/domain/value-objects/primitives/user-id.vo.js';
import { DeliveryFailureReasonVO } from '../../../../src/module/domain/value-objects/primitives/delivery-failure-reason.vo.js';
import { NotificationContentVO } from '../../../../src/module/domain/value-objects/composites/notification-content.vo.js';
import { NotificationRecipientVO } from '../../../../src/module/domain/value-objects/composites/notification-recipient.vo.js';
import { FIXED_USER_ID, FIXED_NOTIFICATION_ID } from '../../../helpers/test-factories.js';
import { makeNotificationRepo, makeEventBridge } from '../../../helpers/mock-services.js';

function build(): NotificationEntity {
  const ch = NotificationChannelVO.email();
  return NotificationEntity.create({
    id: FIXED_NOTIFICATION_ID, now: new Date().toISOString(),
    props: {
      type: NotificationTypeVO.transactional(),
      category: NotificationCategoryVO.order(),
      channel: ch, priority: NotificationPriorityVO.normal(),
      content: NotificationContentVO.create({
        title: NotificationTitleVO.create('T'), body: NotificationBodyVO.create('B'),
      }),
      recipient: NotificationRecipientVO.reconstitute({
        userId: UserIdVO.reconstitute(FIXED_USER_ID), channel: ch,
      }),
    },
  });
}

describe('DeliveryService — reason fallback branch', () => {
  it('retry with permanent failure → decision.reason present', async () => {
    const repo = makeNotificationRepo();
    const svc = new DeliveryService(repo as never, makeEventBridge() as never);
    const e = build();
    e.queue(); e.startSending('smtp');
    e.fail(DeliveryFailureReasonVO.invalidAddress());
    repo.findByIdVO.mockResolvedValueOnce(e);
    await expect(svc.retry(FIXED_NOTIFICATION_ID, 'actor')).rejects.toThrow();
  });
});
