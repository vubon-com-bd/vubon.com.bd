import { describe, it, expect } from '@jest/globals';
import { TotalsMapper } from '../../../../src/module/application/mappers/totals.mapper.js';

describe('TotalsMapper', () => {
  describe('toResponse', () => {
    it('should map full breakdown correctly', () => {
      const breakdown = {
        subtotal: 1000,
        discount: 200,
        taxableBase: 800,
        tax: 120,
        shipping: 60,
        total: 980,
        currency: 'BDT',
        itemCount: 3,
      };

      const dto = TotalsMapper.toResponse(breakdown);

      expect(dto.subtotal).toBe(1000);
      expect(dto.discount).toBe(200);
      expect(dto.taxableBase).toBe(800);
      expect(dto.tax).toBe(120);
      expect(dto.shipping).toBe(60);
      expect(dto.total).toBe(980);
      expect(dto.currency).toBe('BDT');
      expect(dto.itemCount).toBe(3);
    });

    it('should handle zero-value breakdown', () => {
      const breakdown = {
        subtotal: 0,
        discount: 0,
        taxableBase: 0,
        tax: 0,
        shipping: 0,
        total: 0,
        currency: 'BDT',
        itemCount: 0,
      };

      const dto = TotalsMapper.toResponse(breakdown);

      expect(dto.subtotal).toBe(0);
      expect(dto.total).toBe(0);
      expect(dto.itemCount).toBe(0);
    });
  });
});
