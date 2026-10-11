import { describe, it, expect } from '@jest/globals';
import { QuietHoursService } from '../../../../../src/module/infrastructure/services/internal/quiet-hours.service.js';
import { PreferenceEntity } from '../../../../../src/module/domain/entities/preference.entity.js';
import { FIXED_USER_ID, makeUuid } from '../../../../helpers/test-factories.js';

function build(quietHoursEnabled = true, start = 22, end = 8): PreferenceEntity {
  const p = PreferenceEntity.createDefault({
    id: makeUuid(),
    userId: FIXED_USER_ID,
    now: new Date().toISOString(),
  });
  p.updateQuietHours(quietHoursEnabled, start, end);
  return p;
}

describe('QuietHoursService', () => {
  const service = new QuietHoursService();

  it('evaluate returns inQuietHours=false when disabled', () => {
    const p = build(false);
    const r = service.evaluate(p, new Date('2026-10-10T23:00:00.000Z'));
    expect(r.inQuietHours).toBe(false);
    expect(typeof r.currentHour).toBe('number');
  });

  it('evaluate returns inQuietHours=true with nextAllowedAt', () => {
    const p = build(true, 22, 8);
    const d = new Date('2026-10-10T23:30:00');
    d.setHours(23);
    const r = service.evaluate(p, d);
    expect(r.inQuietHours).toBe(true);
    expect(r.nextAllowedAt).toBeDefined();
  });

  it('evaluate outside hours', () => {
    const p = build(true, 22, 8);
    const d = new Date();
    d.setHours(12);
    const r = service.evaluate(p, d);
    expect(r.inQuietHours).toBe(false);
  });

  it('computeNextAllowed returns future ISO', () => {
    const p = build(true, 22, 8);
    const iso = service.computeNextAllowed(p, new Date());
    expect(new Date(iso).getTime()).toBeGreaterThan(Date.now() - 1000);
  });

  it('computeNextAllowed wraps to next day if past end hour', () => {
    const p = build(true, 22, 8);
    const now = new Date();
    now.setHours(10);
    const iso = service.computeNextAllowed(p, now);
    expect(new Date(iso).getTime()).toBeGreaterThan(now.getTime());
  });

  it('shouldBypass for critical priority', () => {
    expect(service.shouldBypass('critical', false, false, false)).toBe(true);
  });

  it('shouldBypass for instant channel', () => {
    expect(service.shouldBypass('normal', true, false, false)).toBe(true);
  });

  it('shouldBypass for transactional type', () => {
    expect(service.shouldBypass('normal', false, true, false)).toBe(true);
  });

  it('shouldBypass for security type', () => {
    expect(service.shouldBypass('normal', false, false, true)).toBe(true);
  });

  it('shouldBypass false for normal non-instant', () => {
    expect(service.shouldBypass('normal', false, false, false)).toBe(false);
  });
});
