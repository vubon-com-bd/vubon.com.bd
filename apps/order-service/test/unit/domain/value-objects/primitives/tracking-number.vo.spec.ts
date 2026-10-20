import { describe, it, expect } from '@jest/globals';
import { TrackingNumberVO } from '@domain/primitives/tracking-number.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('TrackingNumberVO', () => {
  describe('create', () => {
    it('creates from valid format', () => {
      expect(TrackingNumberVO.create('TRK-ABCD1234').value).toBe('TRK-ABCD1234');
    });
    it('uppercases', () => {
      expect(TrackingNumberVO.create('trk-abcd1234').value).toBe('TRK-ABCD1234');
    });
    it('throws for empty', () => {
      expect(() => TrackingNumberVO.create('')).toThrow(ValidationError);
    });
    it('throws for wrong prefix', () => {
      expect(() => TrackingNumberVO.create('XYZ-ABCD1234')).toThrow(ValidationError);
    });
    it('throws for too short', () => {
      expect(() => TrackingNumberVO.create('TRK-A')).toThrow(ValidationError);
    });
  });

  describe('generate', () => {
    it('pads short sequence', () => {
      const vo = TrackingNumberVO.generate('AB12');
      expect(vo.value).toMatch(/^TRK-/);
      expect(vo.value.length).toBeGreaterThanOrEqual(12);
    });
    it('strips non-alphanumeric', () => {
      const vo = TrackingNumberVO.generate('a-b-c-d-e-f');
      expect(vo.value).toMatch(/^TRK-/);
      expect(vo.value.slice(4)).not.toContain('-');
    });
  });

  describe('carrier', () => {
    it('extracts carrier ID', () => {
      expect(TrackingNumberVO.create('TRK-ABCD1234').carrier).toBe('ABCD1234');
    });
  });
});

// ─── Additional branch coverage ─────────────
describe('TrackingNumberVO — branch edge cases', () => {
  it('reconstitute preserves any string', () => {
    const vo = TrackingNumberVO.reconstitute('custom-tracking');
    expect(vo.value).toBe('custom-tracking');
  });

  it('generate with empty sequence pads to min length', () => {
    const vo = TrackingNumberVO.generate('');
    expect(vo.value).toMatch(/^TRK-/);
    expect(vo.value.length).toBeGreaterThan(3);
  });

  it('generate with numeric sequence', () => {
    const vo = TrackingNumberVO.generate('12345');
    expect(vo.value).toMatch(/^TRK-/);
  });

  it('carrier extraction', () => {
    expect(TrackingNumberVO.create('TRK-ABCD1234').carrier).toBe('ABCD1234');
  });

  it('equals method', () => {
    const a = TrackingNumberVO.create('TRK-ABCD1234');
    const b = TrackingNumberVO.create('TRK-ABCD1234');
    expect(a.equals(b)).toBe(true);
  });
});
