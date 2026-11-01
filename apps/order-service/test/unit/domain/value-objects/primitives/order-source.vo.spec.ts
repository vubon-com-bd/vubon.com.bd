/**
 * OrderSourceVO — Full coverage
 */
import { describe, it, expect } from '@jest/globals';
import { OrderSourceVO } from '@domain/primitives/order-source.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('OrderSourceVO', () => {
  describe('create', () => {
    it.each(['customer', 'vendor', 'admin', 'api', 'import', 'bulk'])(
      'accepts "%s"',
      (s) => expect(OrderSourceVO.create(s).value).toBe(s),
    );
    it('normalizes to lowercase', () => {
      expect(OrderSourceVO.create('CUSTOMER').value).toBe('customer');
    });
    it('trims whitespace', () => {
      expect(OrderSourceVO.create('  api  ').value).toBe('api');
    });
    it('throws for invalid', () => {
      expect(() => OrderSourceVO.create('unknown')).toThrow(ValidationError);
      expect(() => OrderSourceVO.create('unknown')).toThrow('Invalid OrderSource');
    });
    it('throws for non-string', () => {
      expect(() => OrderSourceVO.create(123 as unknown as string)).toThrow(ValidationError);
    });
  });

  describe('reconstitute', () => {
    it('skips validation', () => {
      expect(OrderSourceVO.reconstitute('legacy').value).toBe('legacy');
    });
  });

  describe('isSystemGenerated', () => {
    it('true for api/import', () => {
      expect(OrderSourceVO.create('api').isSystemGenerated()).toBe(true);
      expect(OrderSourceVO.create('import').isSystemGenerated()).toBe(true);
    });
    it('false for user sources', () => {
      expect(OrderSourceVO.create('customer').isSystemGenerated()).toBe(false);
      expect(OrderSourceVO.create('admin').isSystemGenerated()).toBe(false);
      expect(OrderSourceVO.create('vendor').isSystemGenerated()).toBe(false);
      expect(OrderSourceVO.create('bulk').isSystemGenerated()).toBe(false);
    });
  });
});
