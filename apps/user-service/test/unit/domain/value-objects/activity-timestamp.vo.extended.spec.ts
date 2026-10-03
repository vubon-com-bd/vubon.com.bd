import { ActivityTimestampVO } from '@domain/value-objects/primitives/activity-timestamp.vo';

describe('ActivityTimestampVO — extended', () => {
  it('now returns current epoch', () => {
    const t = ActivityTimestampVO.now();
    expect(t.epochMs).toBeGreaterThan(0);
  });

  it('fromEpochMs', () => {
    const t = ActivityTimestampVO.fromEpochMs(1700000000000);
    expect(t.epochMs).toBe(1700000000000);
  });

  it('fromEpochMs throws on NaN', () => {
    expect(() => ActivityTimestampVO.fromEpochMs(NaN)).toThrow();
  });

  it('fromDate', () => {
    const d = new Date('2026-01-01T00:00:00Z');
    expect(ActivityTimestampVO.fromDate(d).epochMs).toBe(d.getTime());
  });

  it('fromDate throws on invalid Date', () => {
    expect(() => ActivityTimestampVO.fromDate(new Date('invalid'))).toThrow();
  });

  it('toDate returns Date', () => {
    const t = ActivityTimestampVO.fromEpochMs(1700000000000);
    expect(t.toDate()).toBeInstanceOf(Date);
  });

  it('toISOString', () => {
    const t = ActivityTimestampVO.fromEpochMs(1700000000000);
    expect(t.toISOString()).toContain('T');
  });

  it('isWithinLast true for fresh timestamp', () => {
    const t = ActivityTimestampVO.now();
    expect(t.isWithinLast(60)).toBe(true);
  });

  it('isWithinLast false for old timestamp (2 hours ago)', () => {
    // 2 hours ago >> 60 minutes
    const t = ActivityTimestampVO.fromEpochMs(Date.now() - 2 * 60 * 60 * 1000);
    expect(t.isWithinLast(60)).toBe(false);
  });

  it('isWithinLast true for boundary (30 min ago, within 60)', () => {
    const t = ActivityTimestampVO.fromEpochMs(Date.now() - 30 * 60 * 1000);
    expect(t.isWithinLast(60)).toBe(true);
  });

  it('isToday', () => {
    expect(ActivityTimestampVO.now().isToday()).toBe(true);
  });

  it('isToday false for yesterday', () => {
    const yesterday = Date.now() - 2 * 24 * 60 * 60 * 1000;
    expect(ActivityTimestampVO.fromEpochMs(yesterday).isToday()).toBe(false);
  });

  it('toBanglaString returns string', () => {
    const t = ActivityTimestampVO.now();
    expect(typeof t.toBanglaString()).toBe('string');
  });

  it('timezone getter', () => {
    const t = ActivityTimestampVO.now();
    expect(t.timezone).toBe('Asia/Dhaka');
  });
});
