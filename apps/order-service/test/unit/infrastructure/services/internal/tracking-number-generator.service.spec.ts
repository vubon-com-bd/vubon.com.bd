import { TrackingNumberGeneratorService } from '../../../../../src/module/infrastructure/services/internal/tracking-number-generator.service.js';

describe('TrackingNumberGeneratorService', () => {
  let service: TrackingNumberGeneratorService;

  beforeEach(() => {
    service = new TrackingNumberGeneratorService();
  });

  it('generate() returns TRK-XXXXXXXX', async () => {
    const vo = await service.generate();
    expect(vo.value).toMatch(/^TRK-[A-Z0-9]{8}$/);
  });

  it('generate() produces unique values', async () => {
    const a = await service.generate();
    const b = await service.generate();
    // (extremely high chance of uniqueness)
    expect(a.value === b.value).toBe(false);
  });

  it('isValid() accepts valid', () => {
    expect(service.isValid('TRK-ABCD1234')).toBe(true);
  });

  it('isValid() rejects invalid', () => {
    expect(service.isValid('TRK-abc')).toBe(false);
    expect(service.isValid('BAD-12345678')).toBe(false);
    expect(service.isValid('')).toBe(false);
  });
});
