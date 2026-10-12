import {
  VENDOR_AGGREGATE_TYPE,
  now,
  nowIso,
  newEventId,
} from '../../../../src/module/domain/events/event.helpers.js';

describe('Event helpers', () => {
  describe('VENDOR_AGGREGATE_TYPE', () => {
    it('is "Vendor"', () => {
      expect(VENDOR_AGGREGATE_TYPE).toBe('Vendor');
    });
  });

  describe('now()', () => {
    it('returns numeric timestamp', () => {
      const t = now();
      expect(typeof t).toBe('number');
      expect(t).toBeGreaterThan(0);
    });

    it('returns increasing values', () => {
      const a = now();
      const b = now();
      expect(b).toBeGreaterThanOrEqual(a);
    });
  });

  describe('nowIso()', () => {
    it('returns ISO string', () => {
      const t = nowIso();
      expect(typeof t).toBe('string');
      expect(Number.isNaN(Date.parse(t))).toBe(false);
    });

    it('returns recent date', () => {
      const t = nowIso();
      const diff = Date.now() - Date.parse(t);
      expect(diff).toBeLessThan(1000);
    });
  });

  describe('newEventId()', () => {
    it('returns unique string', () => {
      const a = newEventId();
      const b = newEventId();
      expect(typeof a).toBe('string');
      expect(a).not.toBe(b);
    });

    it('starts with "evt_"', () => {
      const id = newEventId();
      expect(id.startsWith('evt_')).toBe(true);
    });

    it('includes timestamp + counter + random', () => {
      const id = newEventId();
      const parts = id.split('_');
      expect(parts.length).toBeGreaterThanOrEqual(4);
    });

    it('generates 1000 unique IDs in batch', () => {
      const ids = new Set<string>();
      for (let i = 0; i < 1000; i++) {
        ids.add(newEventId());
      }
      expect(ids.size).toBe(1000);
    });
  });
});
