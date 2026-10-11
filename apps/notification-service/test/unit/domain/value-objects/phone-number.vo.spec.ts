import { describe, it, expect } from '@jest/globals';
import { PhoneNumberVO } from '../../../../src/module/domain/value-objects/primitives/phone-number.vo.js';

describe('PhoneNumberVO', () => {
  it('create BD phone', () => {
    const vo = PhoneNumberVO.create('+8801712345678');
    expect(vo.isBangladeshi()).toBe(true);
  });
  it('create international phone', () => {
    const vo = PhoneNumberVO.create('+14155551234');
    expect(vo.isInternational()).toBe(true);
  });
  it('rejects empty', () => expect(() => PhoneNumberVO.create('')).toThrow());
  it('rejects invalid', () => expect(() => PhoneNumberVO.create('abc')).toThrow());
  it('reconstitute', () => expect(PhoneNumberVO.reconstitute('any').value).toBe('any'));
  it('masked hides middle', () => {
    const vo = PhoneNumberVO.reconstitute('+8801712345678');
    expect(vo.masked()).toContain('***');
  });
});
