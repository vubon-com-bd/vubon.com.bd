import { BankNameVO } from '../../../../../src/module/domain/value-objects/primitives/bank-name.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('BankNameVO', () => {
  describe('create()', () => {
    it('accepts valid bank name', () => {
      expect(BankNameVO.create('Dutch Bangla Bank').value).toBe('Dutch Bangla Bank');
    });

    it('normalizes whitespace', () => {
      expect(BankNameVO.create('  Dutch   Bangla  ').value).toBe('Dutch Bangla');
    });

    it('allows special chars in bank names', () => {
      expect(BankNameVO.create('BRAC (Bangladesh) Ltd.').value).toBe('BRAC (Bangladesh) Ltd.');
    });

    it('throws on too short', () => {
      expect(() => BankNameVO.create('A')).toThrow(ValidationError);
    });

    it('throws on too long', () => {
      expect(() => BankNameVO.create('A'.repeat(200))).toThrow(ValidationError);
    });

    it('throws on non-string', () => {
      expect(() => BankNameVO.create(123 as unknown as string)).toThrow(ValidationError);
    });
  });

  describe('looksLikeBank()', () => {
    it('true for names with bank keyword', () => {
      expect(BankNameVO.create('Islami Bank Bangladesh').looksLikeBank()).toBe(true);
      expect(BankNameVO.create('City Commercial').looksLikeBank()).toBe(true);
    });

    it('true for mobile banking', () => {
      expect(BankNameVO.create('bKash').looksLikeBank()).toBe(true);
      expect(BankNameVO.create('Nagad').looksLikeBank()).toBe(true);
    });

    it('false for random name', () => {
      expect(BankNameVO.create('Acme Trading').looksLikeBank()).toBe(false);
    });
  });
});
