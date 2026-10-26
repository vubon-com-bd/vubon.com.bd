import { BroadcastResultEntity } from '@domain/entities/broadcast-result.entity.js';
import { BroadcastResultVO } from '@domain/composites/broadcast-result.vo.js';
import { BroadcastIdVO } from '@domain/primitives/broadcast-id.vo.js';
import { IDS } from '@domain-fixtures/ids.fixture.js';

const NOW = '2025-01-15T10:00:00.000Z';

const result = () =>
  BroadcastResultVO.create({
    broadcastId: BroadcastIdVO.create(IDS.broadcastId),
    recipientCount: 100,
    sentCount: 95,
    deliveredCount: 90,
    failedCount: 5,
    openCount: 45,
    clickCount: 18,
    unsubscribedCount: 1,
    startedAt: NOW,
    completedAt: NOW,
  });

describe('BroadcastResultEntity (child)', () => {
  describe('create()', () => {
    it('creates result entity', () => {
      const entity = BroadcastResultEntity.create({
        id: 'r-1',
        broadcastId: BroadcastIdVO.create(IDS.broadcastId),
        result: result(),
        now: NOW,
      });
      expect(entity.id).toBe('r-1');
    });
  });

  describe('reconstitute()', () => {
    it('restores from DB', () => {
      const entity = BroadcastResultEntity.reconstitute({
        id: 'r-1',
        createdAt: NOW,
        updatedAt: NOW,
        props: {
          broadcastId: BroadcastIdVO.create(IDS.broadcastId),
          result: result(),
        },
      });
      expect(entity.id).toBe('r-1');
    });
  });

  describe('getters', () => {
    it('exposes result + rates', () => {
      const entity = BroadcastResultEntity.create({
        id: 'r-1',
        broadcastId: BroadcastIdVO.create(IDS.broadcastId),
        result: result(),
        now: NOW,
      });
      expect(entity.broadcastId.value).toBe(IDS.broadcastId);
      expect(entity.result).toBeDefined();
      expect(entity.deliveryRate).toBeCloseTo(90 / 95, 2);
      expect(entity.openRate).toBeCloseTo(45 / 90, 2);
      expect(entity.clickRate).toBeCloseTo(18 / 45, 2);
    });
  });
});
