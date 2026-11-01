import { PhoneNumberVO } from '@domain/primitives/phone-number.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('PhoneNumberVO', () => {
  it('accepts Bangladesh phone', () => {
    const vo = PhoneNumberVO.create('+8801712345678');
    expect(vo.value).toBe('+8801712345678');
    expect(vo.isBangladesh).toBe(true);
  });

  it('normalizes spaces and dashes', () => {
    expect(PhoneNumberVO.create('+880-171-234-5678').value).toBe('+8801712345678');
  });

  it('rejects empty', () => {
    expect(() => PhoneNumberVO.create('')).toThrow(ValidationError);
  });

  it('rejects invalid format', () => {
    expect(() => PhoneNumberVO.create('abc123')).toThrow(ValidationError);
  });

  it('rejects too long', () => {
    expect(() => PhoneNumberVO.create('1'.repeat(20))).toThrow(ValidationError);
  });

  describe('masked', () => {
    it('masks most digits', () => {
      const masked = PhoneNumberVO.create('+8801712345678').masked;
      expect(masked.slice(-4)).toBe('5678');
      expect(masked).toContain('*');
    });
  });
});
