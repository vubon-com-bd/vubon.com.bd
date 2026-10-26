/**
 * Broadcast Lifecycle E2E
 * @module notification-service/test/e2e/domain
 */
import { BroadcastEntity } from '@domain/entities/broadcast.entity.js';
import { BroadcastVO } from '@domain/composites/broadcast.vo.js';
import { NotificationContentVO } from '@domain/composites/notification-content.vo.js';
import { BroadcastIdVO } from '@domain/primitives/broadcast-id.vo.js';
import { BroadcastTypeVO } from '@domain/primitives/broadcast-type.vo.js';
import { BroadcastStatusVO } from '@domain/primitives/broadcast-status.vo.js';
import { BroadcastAudienceVO } from '@domain/primitives/broadcast-audience.vo.js';
import { NotificationChannelVO } from '@domain/primitives/notification-channel.vo.js';
import { NotificationSubjectVO } from '@domain/primitives/notification-subject.vo.js';
import { NotificationBodyVO } from '@domain/primitives/notification-body.vo.js';
import { NotificationDataVO } from '@domain/primitives/notification-data.vo.js';
import { UserIdVO } from '@domain/primitives/user-id.vo.js';

import { CanBroadcastSpecification } from '@domain/specifications/can-broadcast.specification.js';

import { IDS } from '@domain-fixtures/ids.fixture.js';

const NOW = new Date().toISOString();
const FUTURE = new Date(Date.now() + 3_600_000).toISOString();

describe('Broadcast Lifecycle — E2E', () => {
  it('create → approve → schedule → start → complete', () => {
    // 1. Create
    const entity = BroadcastEntity.create({
      id: BroadcastIdVO.create(IDS.broadcastId),
      vo: BroadcastVO.create({
        id: BroadcastIdVO.create(IDS.broadcastId),
        name: 'Big Sale',
        type: BroadcastTypeVO.create('all_users'),
        status: BroadcastStatusVO.draft(),
        audience: BroadcastAudienceVO.create({ target: 'all' }),
        channels: [NotificationChannelVO.email()],
        content: NotificationContentVO.create({
          subject: NotificationSubjectVO.create('Sale!'),
          body: NotificationBodyVO.create('Get 50% off'),
          data: NotificationDataVO.create({}),
        }),
        createdBy: UserIdVO.create(IDS.userId),
        recipientCount: 1000,
        sentCount: 0,
        failedCount: 0,
      }),
      now: NOW,
    });
    expect(entity.isDraft()).toBe(true);

    // 2. Approve
    entity.approve(UserIdVO.create(IDS.userId2), NOW);
    expect(entity.vo.isApproved()).toBe(true);

    // 3. Spec check
    expect(
      CanBroadcastSpecification.strict().isSatisfiedBy({
        broadcast: entity,
        ctx: { requireApproval: true },
      }),
    ).toBe(true);

    // 4. Schedule
    entity.schedule(FUTURE, NOW);
    expect(entity.isScheduled()).toBe(true);

    // 5. Start
    entity.start(NOW);
    expect(entity.isSending()).toBe(true);

    // 6. Update progress
    entity.updateProgress(500, 10, NOW);
    expect(entity.sentCount).toBe(500);

    // 7. Complete
    entity.complete(NOW);
    expect(entity.isSent()).toBe(true);
  });

  it('cancellation — create → cancel', () => {
    const entity = BroadcastEntity.create({
      id: BroadcastIdVO.create(IDS.broadcastId),
      vo: BroadcastVO.create({
        id: BroadcastIdVO.create(IDS.broadcastId),
        name: 'S',
        type: BroadcastTypeVO.create('all_users'),
        status: BroadcastStatusVO.draft(),
        audience: BroadcastAudienceVO.create({ target: 'all' }),
        channels: [NotificationChannelVO.email()],
        content: NotificationContentVO.create({
          subject: NotificationSubjectVO.create('X'),
          body: NotificationBodyVO.create('Y'),
          data: NotificationDataVO.create({}),
        }),
        createdBy: UserIdVO.create(IDS.userId),
        recipientCount: 100,
        sentCount: 0,
        failedCount: 0,
      }),
      now: NOW,
    });
    entity.cancel('user requested', IDS.userId, NOW);
    expect(entity.isCancelled()).toBe(true);
    expect(entity.cancelledReason).toBe('user requested');
  });
});
