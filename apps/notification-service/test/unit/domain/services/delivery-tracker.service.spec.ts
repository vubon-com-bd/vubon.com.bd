import { DeliveryTrackerService } from '@domain/services/delivery-tracker.service.js';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

const attempt = (o: any = {}) => ({
  attemptNumber: 1,
  succeeded: true,
  durationMs: 100,
  occurredAt: '2025-01-15T10:00:00.000Z',
  ...o,
});

describe('DeliveryTrackerService', () => {
  describe('summarize()', () => {
    it('handles empty attempts', () => {
      const r = DeliveryTrackerService.summarize({ attempts: [] });
      expect(r.totalAttempts).toBe(0);
      expect(r.successRate).toBe(0);
    });

    it('computes success/failure count', () => {
      const r = DeliveryTrackerService.summarize({
        attempts: [
          attempt({ succeeded: true }),
          attempt({ succeeded: false, errorCode: 'TIMEOUT' }),
        ],
      });
      expect(r.totalAttempts).toBe(2);
      expect(r.successful).toBe(1);
      expect(r.failed).toBe(1);
      expect(r.successRate).toBe(0.5);
    });

    it('computes avgDuration and p95', () => {
      const r = DeliveryTrackerService.summarize({
        attempts: [
          attempt({ durationMs: 100 }),
          attempt({ durationMs: 200 }),
          attempt({ durationMs: 300 }),
        ],
      });
      expect(r.avgDurationMs).toBe(200);
      expect(r.p95DurationMs).toBeGreaterThan(0);
    });

    it('aggregates by error code', () => {
      const r = DeliveryTrackerService.summarize({
        attempts: [
          attempt({ succeeded: false, errorCode: 'TIMEOUT' }),
          attempt({ succeeded: false, errorCode: 'TIMEOUT' }),
          attempt({ succeeded: false, errorCode: 'BOUNCE' }),
        ],
      });
      expect(r.byErrorCode['TIMEOUT']).toBe(2);
      expect(r.byErrorCode['BOUNCE']).toBe(1);
    });

    it('aggregates by provider', () => {
      const r = DeliveryTrackerService.summarize({
        attempts: [
          attempt({ providerName: 'sendgrid' }),
          attempt({ providerName: 'sendgrid' }),
          attempt({ providerName: 'mailgun' }),
        ],
      });
      expect(r.byProvider['sendgrid']).toBe(2);
      expect(r.byProvider['mailgun']).toBe(1);
    });

    it('skips invalid durationMs', () => {
      const r = DeliveryTrackerService.summarize({
        attempts: [
          attempt({ durationMs: -1 }),
          attempt({ durationMs: 100 }),
        ],
      });
      expect(r.avgDurationMs).toBeGreaterThanOrEqual(0);
    });

    it('throws on non-array', () => {
      expect(() => DeliveryTrackerService.summarize({ attempts: 'no' as any })).toThrow(BusinessRuleError);
    });
  });

  describe('isAtRisk()', () => {
    it('true if successRate < threshold', () => {
      const stats = DeliveryTrackerService.summarize({
        attempts: [
          attempt({ succeeded: false }),
          attempt({ succeeded: false }),
          attempt({ succeeded: true }),
        ],
      });
      expect(DeliveryTrackerService.isAtRisk(stats, 0.9)).toBe(true);
    });

    it('false when above threshold', () => {
      const stats = DeliveryTrackerService.summarize({
        attempts: [attempt({ succeeded: true }), attempt({ succeeded: true })],
      });
      expect(DeliveryTrackerService.isAtRisk(stats, 0.9)).toBe(false);
    });
  });
});
