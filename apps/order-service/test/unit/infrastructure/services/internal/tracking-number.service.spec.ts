import { describe, it, expect, beforeEach } from '@jest/globals';
import { TrackingNumberService } from '@infrastructure/services/internal/tracking-number.service';

describe('TrackingNumberService', () => {
  let service: TrackingNumberService;

  beforeEach(() => {
    service = new TrackingNumberService();
  });

  it('generate creates TRK-XXXXXXXX', () => {
    const result = service.generate('abc12345');
    expect(result).toBe('TRK-ABC12345');
  });

  it('strips non-alphanumeric chars (pads to min length)', () => {
    // 'abc-123!@#' → 'ABC123' (6 chars) → padded with '0' to 8 → 'ABC12300'
    const result = service.generate('abc-123!@#');
    expect(result).toMatch(/^TRK-ABC1230+$/);
    expect(result.startsWith('TRK-ABC123')).toBe(true);
  });

  it('pads short seeds to min length', () => {
    const result = service.generate('ab');
    expect(result).toMatch(/^TRK-AB0+$/);
  });

  it('truncates long seeds to max length', () => {
    const long = 'A'.repeat(30);
    const result = service.generate(long);
    expect(result.length).toBeLessThanOrEqual(24); // TRK- (4) + 20 max
  });
});
