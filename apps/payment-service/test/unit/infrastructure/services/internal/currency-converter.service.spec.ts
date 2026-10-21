/**
 * CurrencyConverterService — Unit Tests
 */
import { describe, it, expect, beforeEach } from '@jest/globals';
import { CurrencyConverterService } from '@infrastructure/services/internal/currency-converter.service';

describe('CurrencyConverterService', () => {
  let service: CurrencyConverterService;

  beforeEach(() => {
    service = new CurrencyConverterService();
  });

  describe('getRates()', () => {
    it('returns rate map with BDT=1', async () => {
      const rates = await service.getRates();
      expect(rates['BDT']).toBe(1);
      expect(typeof rates['USD']).toBe('number');
    });

    it('caches rates on subsequent calls', async () => {
      const a = await service.getRates();
      const b = await service.getRates();
      expect(a).toBe(b);
    });
  });

  describe('convert()', () => {
    it('same currency returns same amount', async () => {
      const result = await service.convert(1000, 'BDT', 'BDT');
      expect(result).toBe(1000);
    });

    it('converts BDT to USD', async () => {
      const result = await service.convert(11000, 'BDT', 'USD');
      expect(result).toBe(100);
    });

    it('converts USD to BDT', async () => {
      const result = await service.convert(100, 'USD', 'BDT');
      expect(result).toBe(11000);
    });
  });

  describe('toBdt()', () => {
    it('converts USD to BDT', async () => {
      const result = await service.toBdt(100, 'USD');
      expect(result).toBe(11000);
    });

    it('BDT to BDT is a no-op', async () => {
      expect(await service.toBdt(1000, 'BDT')).toBe(1000);
    });
  });

  describe('fromBdt()', () => {
    it('converts BDT to USD', async () => {
      const result = await service.fromBdt(11000, 'USD');
      expect(result).toBe(100);
    });
  });
});
