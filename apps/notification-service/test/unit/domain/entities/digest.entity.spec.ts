import { DigestEntity } from '@domain/entities/digest.entity.js';
import { DigestVO } from '@domain/composites/digest.vo.js';
import { DigestItemVO } from '@domain/composites/digest-item.vo.js';
import { DigestIdVO } from '@domain/primitives/digest-id.vo.js';
import { DigestStatusVO } from '@domain/primitives/digest-status.vo.js';
import { DigestTypeVO } from '@domain/primitives/digest-type.vo.js';
import { DigestPeriodVO } from '@domain/primitives/digest-period.vo.js';
import { NotificationIdVO } from '@domain/primitives/notification-id.vo.js';
import { NotificationCategoryVO } from '@domain/primitives/notification-category.vo.js';
import { NotificationPriorityVO } from '@domain/primitives/notification-priority.vo.js';
import { UserIdVO } from '@domain/primitives/user-id.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { IDS } from '@domain-fixtures/ids.fixture.js';

// ⚠️ Use dynamic dates to avoid periodStart/periodEnd invariant violations
const NOW = new Date().toISOString();
const DAY_AGO = new Date(Date.now() - 86_400_000).toISOString();

const makeVO = (overrides: any = {}) =>
  DigestVO.create({
    id: DigestIdVO.create(IDS.digestId),
    userId: UserIdVO.create(IDS.userId),
    status: DigestStatusVO.pending(),
    type: DigestTypeVO.create('summary'),
    period: DigestPeriodVO.create({
      frequency: 'daily',
      periodStart: DAY_AGO,
      periodEnd: NOW,
    }),
    categories: ['order'],
    sendHour: 9,
    timezone: 'UTC',
    itemCount: 0,
    ...overrides,
  });

const makeItem = () =>
  DigestItemVO.create({
    notificationId: NotificationIdVO.create(IDS.notificationId),
    category: NotificationCategoryVO.create('order'),
    priority: NotificationPriorityVO.normal(),
    title: 'Order 1234',
    summary: 'Your order is confirmed',
    occurredAt: NOW,
  });

describe('DigestEntity (Aggregate Root)', () => {
  describe('create()', () => {
    it('creates with pending status + event', () => {
      const entity = DigestEntity.create({
        id: DigestIdVO.create(IDS.digestId),
        vo: makeVO(),
        now: NOW,
      });
      expect(entity.isPending()).toBe(true);
      expect(entity.domainEvents.length).toBe(1);
    });

    it('rejects non-pending status', () => {
      expect(() =>
        DigestEntity.create({
          id: DigestIdVO.create(IDS.digestId),
          vo: makeVO({ status: DigestStatusVO.ready() }),
          now: NOW,
        }),
      ).toThrow(ValidationError);
    });
  });

  describe('reconstitute()', () => {
    it('rebuilds from state', () => {
      const entity = DigestEntity.reconstitute({
        id: IDS.digestId,
        createdAt: NOW,
        updatedAt: NOW,
        props: { vo: makeVO(), items: [] },
      });
      expect(entity.id).toBe(IDS.digestId);
    });
  });

  describe('startGenerating()', () => {
    it('pending → generating', () => {
      const entity = DigestEntity.create({
        id: DigestIdVO.create(IDS.digestId),
        vo: makeVO(),
        now: NOW,
      });
      entity.startGenerating(NOW);
      expect(entity.isGenerating()).toBe(true);
    });
  });

  describe('completeGeneration()', () => {
    it('generating → ready with items', () => {
      const entity = DigestEntity.create({
        id: DigestIdVO.create(IDS.digestId),
        vo: makeVO(),
        now: NOW,
      });
      entity.startGenerating(NOW);
      entity.completeGeneration([makeItem(), makeItem()], NOW);
      expect(entity.isReady()).toBe(true);
      expect(entity.itemCount).toBe(2);
    });
  });

  describe('markSent()', () => {
    it('ready → sent', () => {
      const entity = DigestEntity.create({
        id: DigestIdVO.create(IDS.digestId),
        vo: makeVO(),
        now: NOW,
      });
      entity.startGenerating(NOW);
      entity.completeGeneration([makeItem()], NOW);
      entity.markSent(NOW);
      expect(entity.isSent()).toBe(true);
    });

    it('rejects sending empty digest', () => {
      const entity = DigestEntity.create({
        id: DigestIdVO.create(IDS.digestId),
        vo: makeVO(),
        now: NOW,
      });
      entity.startGenerating(NOW);
      entity.completeGeneration([], NOW);
      expect(() => entity.markSent(NOW)).toThrow(BusinessRuleError);
    });
  });

  describe('fail()', () => {
    it('generating → failed', () => {
      const entity = DigestEntity.create({
        id: DigestIdVO.create(IDS.digestId),
        vo: makeVO(),
        now: NOW,
      });
      entity.startGenerating(NOW);
      entity.fail('timeout', NOW);
      expect(entity.isFailed()).toBe(true);
      expect(entity.failureReason).toBe('timeout');
    });
  });

  describe('cancel()', () => {
    it('pending → cancelled', () => {
      const entity = DigestEntity.create({
        id: DigestIdVO.create(IDS.digestId),
        vo: makeVO(),
        now: NOW,
      });
      entity.cancel('user requested', NOW);
      expect(entity.isCancelled()).toBe(true);
      expect(entity.cancelledReason).toBe('user requested');
    });
  });

  describe('getters', () => {
    it('exposes all fields', () => {
      const entity = DigestEntity.create({
        id: DigestIdVO.create(IDS.digestId),
        vo: makeVO(),
        now: NOW,
      });
      expect(entity.id).toBe(IDS.digestId);
      expect(entity.digestId.value).toBe(IDS.digestId);
      expect(entity.vo).toBeDefined();
      expect(entity.status).toBeDefined();
      expect(entity.items).toEqual([]);
      expect(entity.itemCount).toBe(0);
      expect(entity.isEmpty()).toBe(true);
      expect(entity.failureReason).toBeUndefined();
      expect(entity.cancelledAt).toBeUndefined();
      expect(entity.cancelledReason).toBeUndefined();
    });
  });
});
