/**
 * Digest Generation E2E
 * @module notification-service/test/e2e/domain
 */
import { DigestEntity } from '@domain/entities/digest.entity.js';
import { DigestVO } from '@domain/composites/digest.vo.js';
import { DigestIdVO } from '@domain/primitives/digest-id.vo.js';
import { DigestStatusVO } from '@domain/primitives/digest-status.vo.js';
import { DigestTypeVO } from '@domain/primitives/digest-type.vo.js';
import { DigestPeriodVO } from '@domain/primitives/digest-period.vo.js';
import { UserIdVO } from '@domain/primitives/user-id.vo.js';

import { DigestBuilderService } from '@domain/services/digest-builder.service.js';
import { DigestSchedulerService } from '@domain/services/digest-scheduler.service.js';

import { IDS } from '@domain-fixtures/ids.fixture.js';

const NOW = new Date().toISOString();
const DAY_AGO = new Date(Date.now() - 86_400_000).toISOString();

describe('Digest Generation — E2E', () => {
  it('schedule → generate → send', () => {
    // 1. Compute schedule
    const schedule = DigestSchedulerService.nextSchedule({
      frequency: 'daily',
      sendHour: 9,
      timezone: 'UTC',
      now: NOW,
    });
    expect(schedule.nextSendAt).toBeDefined();

    // 2. Build items
    const buildResult = DigestBuilderService.build({
      items: [
        { notificationId: IDS.notificationId, category: 'order', priority: 'high', title: 'Order 1', body: 'Body', occurredAt: NOW },
        { notificationId: IDS.notificationId2, category: 'payment', priority: 'normal', title: 'Payment', body: 'Body', occurredAt: NOW },
      ],
    });
    expect(buildResult.items.length).toBe(2);

    // 3. Create digest
    const entity = DigestEntity.create({
      id: DigestIdVO.create(IDS.digestId),
      vo: DigestVO.create({
        id: DigestIdVO.create(IDS.digestId),
        userId: UserIdVO.create(IDS.userId),
        status: DigestStatusVO.pending(),
        type: DigestTypeVO.create('summary'),
        period: DigestPeriodVO.create({
          frequency: 'daily',
          periodStart: DAY_AGO,
          periodEnd: NOW,
        }),
        categories: ['order', 'payment'],
        sendHour: 9,
        timezone: 'UTC',
        itemCount: 0,
      }),
      now: NOW,
    });

    // 4. Generate
    entity.startGenerating(NOW);
    expect(entity.isGenerating()).toBe(true);

    entity.completeGeneration([...buildResult.items], NOW);
    expect(entity.isReady()).toBe(true);
    expect(entity.itemCount).toBe(2);

    // 5. Send
    entity.markSent(NOW);
    expect(entity.isSent()).toBe(true);
  });
});
