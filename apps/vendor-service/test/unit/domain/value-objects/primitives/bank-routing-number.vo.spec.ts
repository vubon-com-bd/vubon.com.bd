import { BankRoutingNumberVO } from '../../../../../src/module/domain/value-objects/primitives/bank-routing-number.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('BankRoutingNumberVO', () => {
  describe('create()', () => {
    it('accepts 9-digit number', () => {
      expect(BankRoutingNumberVO.create('123456789').value).toBe('123456789');
    });

    it('removes whitespace', () => {
      expect(BankRoutingNumberVO.create('  123456789  ').value).toBe('123456789');
    });

    it('throws on 8 digits', () => {
      expect(() => BankRoutingNumberVO.create('12345678')).toThrow(ValidationError);
    });

    it('throws on 10 digits', () => {
      expect(() => BankRoutingNumberVO.create('1234567890')).toThrow(ValidationError);
    });

    it('throws on letters', () => {
      expect(() => BankRoutingNumberVO.create('ABCDEFGHI')).toThrow(ValidationError);
    });
  });

  describe('code segments', () => {
    it('extracts bank code (first 3)', () => {
      expect(BankRoutingNumberVO.create('123456789').getBankCode()).toBe('123');
    });

    it('extracts district code (middle 3)', () => {
      expect(BankRoutingNumberVO.create('123456789').getDistrictCode()).toBe('456');
    });

    it('extracts branch code (last 3)', () => {
      expect(BankRoutingNumberVO.create('123456789').getBranchCode()).toBe('789');
    });
  });
});
