import { AccountHolderNameVO } from '../../../../../src/module/domain/value-objects/primitives/account-holder-name.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('AccountHolderNameVO', () => {
  it('accepts valid name', () => {
    expect(AccountHolderNameVO.create('Md. Rahim Uddin').value).toBe('Md. Rahim Uddin');
  });

  it('normalizes whitespace', () => {
    expect(AccountHolderNameVO.create('  Md.   Rahim  ').value).toBe('Md. Rahim');
  });

  it('allows hyphens and apostrophes', () => {
    expect(AccountHolderNameVO.create("O'Brien-Smith").value).toBe("O'Brien-Smith");
  });

  it('throws on too short', () => {
    expect(() => AccountHolderNameVO.create('A')).toThrow(ValidationError);
  });

  it('throws on too long', () => {
    expect(() => AccountHolderNameVO.create('A'.repeat(200))).toThrow(ValidationError);
  });

  it('throws on digits', () => {
    expect(() => AccountHolderNameVO.create('Rahim123')).toThrow(ValidationError);
  });

  it('throws on non-string', () => {
    expect(() => AccountHolderNameVO.create(123 as unknown as string)).toThrow(ValidationError);
  });

  describe('hasMultipleWords()', () => {
    it('true for full name', () => {
      expect(AccountHolderNameVO.create('Md Rahim').hasMultipleWords()).toBe(true);
    });

    it('false for single word', () => {
      expect(AccountHolderNameVO.create('Rahim').hasMultipleWords()).toBe(false);
    });
  });
});
