import { describe, it, expect } from '@jest/globals';
import { EmailAddressVO } from '../../../../src/module/domain/value-objects/primitives/email-address.vo.js';

describe('EmailAddressVO', () => {
  it('create valid', () => {
    const vo = EmailAddressVO.create('User@Example.COM');
    expect(vo.value).toBe('user@example.com');
  });
  it('rejects empty', () => expect(() => EmailAddressVO.create('')).toThrow());
  it('rejects invalid format', () => expect(() => EmailAddressVO.create('not-an-email')).toThrow());
  it('reconstitute', () => expect(EmailAddressVO.reconstitute('any').value).toBe('any'));
});
