import { OrderNumberGeneratorService } from '../../../../../src/module/infrastructure/services/internal/order-number-generator.service.js';

describe('OrderNumberGeneratorService', () => {
  let service: OrderNumberGeneratorService;

  beforeEach(() => {
    service = new OrderNumberGeneratorService();
  });

  it('generate() returns valid OrderNumberVO', async () => {
    const vo = await service.generate(2026);
    expect(vo.value).toMatch(/^ORD-2026-\d{6}$/);
    expect(vo.year).toBe(2026);
  });

  it('generate() uses current year by default', async () => {
    const vo = await service.generate();
    expect(vo.year).toBe(new Date().getFullYear());
  });

  it('generate() produces unique values (timestamp-based)', async () => {
    const a = await service.generate(2026);
    await new Promise((r) => setTimeout(r, 2));
    const b = await service.generate(2026);
    expect(a.value).not.toBe(b.value);
  });

  it('isValid() accepts valid format', () => {
    expect(service.isValid('ORD-2026-000001')).toBe(true);
  });

  it('isValid() rejects invalid', () => {
    expect(service.isValid('ORD-2026-1')).toBe(false);
    expect(service.isValid('bad')).toBe(false);
  });
});
