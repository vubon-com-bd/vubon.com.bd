import { EmailAddressVO } from '@domain/primitives/email-address.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('EmailAddressVO', () => {
  it('accepts valid email', () => {
    const vo = EmailAddressVO.create('user@example.com');
    expect(vo.value).toBe('user@example.com');
  });

  it('normalizes lowercase', () => {
    expect(EmailAddressVO.create('USER@Example.COM').value).toBe('user@example.com');
  });

  it('trims whitespace', () => {
    expect(EmailAddressVO.create('  user@example.com  ').value).toBe('user@example.com');
  });

  it('rejects empty', () => {
    expect(() => EmailAddressVO.create('')).toThrow(ValidationError);
  });

  it('rejects invalid format', () => {
    expect(() => EmailAddressVO.create('not-an-email')).toThrow(ValidationError);
  });

  it('rejects too long', () => {
    expect(() => EmailAddressVO.create('a'.repeat(250) + '@example.com')).toThrow(ValidationError);
  });

  describe('parts', () => {
    it('localPart', () => {
      expect(EmailAddressVO.create('user@example.com').localPart).toBe('user');
    });
    it('domain', () => {
      expect(EmailAddressVO.create('user@example.com').domain).toBe('example.com');
    });
    it('domainWithoutTld', () => {
      expect(EmailAddressVO.create('user@mail.example.com').domainWithoutTld).toBe('mail.example');
    });
  });
});
