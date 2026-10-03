import { DeliverySchedulerService } from '../../../../../src/module/infrastructure/services/internal/delivery-scheduler.service.js';

describe('DeliverySchedulerService (infra)', () => {
  let service: DeliverySchedulerService;

  beforeEach(() => {
    service = new DeliverySchedulerService();
  });

  it('estimateForType() returns estimate', () => {
    const result = service.estimateForType('express');
    expect(result.estimatedDays).toBe(1);
    expect(result.estimatedAt).toBeTruthy();
  });

  it('estimate()', () => {
    const result = service.estimate(3);
    expect(result.estimatedDays).toBe(3);
  });

  it('canAttemptNow()', () => {
    expect(typeof service.canAttemptNow()).toBe('boolean');
  });

  it('nextAvailableSlot() returns Date', () => {
    expect(service.nextAvailableSlot()).toBeInstanceOf(Date);
  });

  it('graceEnd() adds grace period', () => {
    const scheduled = new Date('2026-01-07T10:00:00Z');
    const end = service.graceEnd(scheduled);
    expect(end.getTime()).toBeGreaterThan(scheduled.getTime());
  });

  it('canRetry()', () => {
    const last = new Date('2026-01-01T10:00:00Z');
    const later = new Date('2026-01-02T10:00:00Z');
    expect(service.canRetry(last, later)).toBe(true);
  });
});
