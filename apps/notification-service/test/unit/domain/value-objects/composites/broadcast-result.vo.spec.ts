import { BroadcastResultVO } from '@domain/composites/broadcast-result.vo.js';
import { BroadcastIdVO } from '@domain/primitives/broadcast-id.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { IDS } from '@domain-fixtures/ids.fixture.js';

const makeProps = (overrides: any = {}) => ({
  broadcastId: BroadcastIdVO.create(IDS.broadcastId),
  recipientCount: 1000,
  sentCount: 950,
  deliveredCount: 900,
  failedCount: 50,
  openCount: 450,
  clickCount: 180,
  unsubscribedCount: 10,
  startedAt: '2025-01-15T10:00:00.000Z',
  completedAt: '2025-01-15T11:00:00.000Z',
  ...overrides,
});

describe('BroadcastResultVO', () => {
  describe('create()', () => {
    it('creates valid result', () => {
      const vo = BroadcastResultVO.create(makeProps());
      expect(vo.recipientCount).toBe(1000);
    });

    it('rejects negative values', () => {
      expect(() => BroadcastResultVO.create(makeProps({ sentCount: -1 }))).toThrow(ValidationError);
    });

    it('rejects sent+failed > recipient', () => {
      expect(() =>
        BroadcastResultVO.create(makeProps({ recipientCount: 100, sentCount: 80, failedCount: 30 })),
      ).toThrow(ValidationError);
    });

    it('rejects delivered > sent', () => {
      expect(() =>
        BroadcastResultVO.create(makeProps({ sentCount: 100, deliveredCount: 200 })),
      ).toThrow(ValidationError);
    });

    it('rejects opened > delivered', () => {
      expect(() =>
        BroadcastResultVO.create(makeProps({ deliveredCount: 100, openCount: 200 })),
      ).toThrow(ValidationError);
    });

    it('rejects clicked > opened', () => {
      expect(() =>
        BroadcastResultVO.create(makeProps({ openCount: 100, clickCount: 200 })),
      ).toThrow(ValidationError);
    });

    it('rejects invalid startedAt ISO', () => {
      expect(() =>
        BroadcastResultVO.create(makeProps({ startedAt: 'garbage' })),
      ).toThrow(ValidationError);
    });

    it('rejects completed < started', () => {
      expect(() =>
        BroadcastResultVO.create(
          makeProps({
            startedAt: '2025-01-15T11:00:00Z',
            completedAt: '2025-01-15T10:00:00Z',
          }),
        ),
      ).toThrow(ValidationError);
    });
  });

  describe('reconstitute', () => {
    it('skips validation', () => {
      const vo = BroadcastResultVO.reconstitute(makeProps());
      expect(vo.broadcastId).toBeDefined();
    });
  });

  describe('rates', () => {
    const vo = BroadcastResultVO.reconstitute(makeProps());

    it('deliveryRate', () => {
      expect(vo.deliveryRate).toBeCloseTo(900 / 950, 2);
    });

    it('openRate', () => {
      expect(vo.openRate).toBeCloseTo(450 / 900, 2);
    });

    it('clickRate', () => {
      expect(vo.clickRate).toBeCloseTo(180 / 450, 2);
    });

    it('unsubscribeRate', () => {
      expect(vo.unsubscribeRate).toBeCloseTo(10 / 900, 4);
    });

    it('failureRate', () => {
      expect(vo.failureRate).toBeCloseTo(50 / 1000, 2);
    });
  });

  describe('rates zero edge', () => {
    it('deliveryRate 0 when sentCount 0', () => {
      const vo = BroadcastResultVO.reconstitute(
        makeProps({ sentCount: 0, deliveredCount: 0, openCount: 0, clickCount: 0 }),
      );
      expect(vo.deliveryRate).toBe(0);
      expect(vo.openRate).toBe(0);
      expect(vo.clickRate).toBe(0);
    });

    it('failureRate 0 when recipientCount 0', () => {
      const vo = BroadcastResultVO.reconstitute(
        makeProps({
          recipientCount: 0,
          sentCount: 0,
          deliveredCount: 0,
          failedCount: 0,
          openCount: 0,
          clickCount: 0,
        }),
      );
      expect(vo.failureRate).toBe(0);
    });
  });

  describe('duration', () => {
    it('durationMs = completed - started', () => {
      const vo = BroadcastResultVO.reconstitute(makeProps());
      expect(vo.durationMs).toBe(3_600_000);
    });

    it('throughputPerSecond', () => {
      const vo = BroadcastResultVO.reconstitute(makeProps());
      expect(vo.throughputPerSecond).toBeCloseTo(950 / 3600, 2);
    });

    it('throughput 0 when durationMs 0', () => {
      const vo = BroadcastResultVO.reconstitute(
        makeProps({
          startedAt: '2025-01-15T10:00:00Z',
          completedAt: '2025-01-15T10:00:00Z',
        }),
      );
      expect(vo.throughputPerSecond).toBe(0);
    });
  });

  describe('getters', () => {
    const vo = BroadcastResultVO.reconstitute(makeProps());
    it('exposes all fields', () => {
      expect(vo.broadcastId).toBeDefined();
      expect(vo.recipientCount).toBe(1000);
      expect(vo.sentCount).toBe(950);
      expect(vo.deliveredCount).toBe(900);
      expect(vo.failedCount).toBe(50);
      expect(vo.openCount).toBe(450);
      expect(vo.clickCount).toBe(180);
      expect(vo.unsubscribedCount).toBe(10);
      expect(vo.startedAt).toBe('2025-01-15T10:00:00.000Z');
      expect(vo.completedAt).toBe('2025-01-15T11:00:00.000Z');
    });
  });
});
