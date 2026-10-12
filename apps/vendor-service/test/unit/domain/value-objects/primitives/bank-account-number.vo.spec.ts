import { BankAccountNumberVO } from '../../../../../src/module/domain/value-objects/primitives/bank-account-number.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('BankAccountNumberVO', () => {
  describe('create()', () => {
    it('accepts numeric account', () => {
      expect(BankAccountNumberVO.create('1234567890123').value).toBe('1234567890123');
    });

    it('uppercases alphanumeric', () => {
      expect(BankAccountNumberVO.create('abc12345def').value).toBe('ABC12345DEF');
    });

    it('removes whitespace', () => {
      expect(BankAccountNumberVO.create('1234 5678 9012').value).toBe('123456789012');
    });

    it('throws on too short', () => {
      expect(() => BankAccountNumberVO.create('1234')).toThrow(ValidationError);
    });

    it('throws on too long', () => {
      expect(() => BankAccountNumberVO.create('A'.repeat(50))).toThrow(ValidationError);
    });

    it('throws on special chars', () => {
      expect(() => BankAccountNumberVO.create('1234-5678')).toThrow(ValidationError);
    });

    it('throws on non-string', () => {
      expect(() => BankAccountNumberVO.create(12345678 as unknown as string)).toThrow(ValidationError);
    });
  });

  describe('isNumericOnly()', () => {
    it('true for digits only', () => {
      expect(BankAccountNumberVO.create('123456789').isNumericOnly()).toBe(true);
    });

    it('false for alphanumeric', () => {
      expect(BankAccountNumberVO.create('ABC12345').isNumericOnly()).toBe(false);
    });
  });

  describe('masked() / last4()', () => {
    it('masks all but last 4', () => {
      const vo = BankAccountNumberVO.create('1234567890');
      expect(vo.masked()).toBe('******7890');
    });

    it('extracts last 4', () => {
      expect(BankAccountNumberVO.create('1234567890').last4()).toBe('7890');
    });

    it('8-char value masks first 4 chars', () => {
      const vo = BankAccountNumberVO.create('12345678');
      expect(vo.masked()).toBe('****5678');
    });
  });
});
