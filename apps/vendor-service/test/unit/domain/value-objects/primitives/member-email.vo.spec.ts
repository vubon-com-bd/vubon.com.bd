import { MemberEmailVO } from '../../../../../src/module/domain/value-objects/primitives/member-email.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('MemberEmailVO', () => {
  it('accepts valid email', () => {
    expect(MemberEmailVO.create('member@acme.com').value).toBe('member@acme.com');
  });

  it('lowercases', () => {
    expect(MemberEmailVO.create('MEMBER@ACME.COM').value).toBe('member@acme.com');
  });

  it('trims whitespace', () => {
    expect(MemberEmailVO.create('  member@acme.com  ').value).toBe('member@acme.com');
  });

  it('throws on invalid', () => {
    expect(() => MemberEmailVO.create('invalid')).toThrow(ValidationError);
  });

  it('throws on non-string', () => {
    expect(() => MemberEmailVO.create(123 as unknown as string)).toThrow(ValidationError);
  });

  describe('isDisposable()', () => {
    it('true for disposable', () => {
      expect(MemberEmailVO.create('test@mailinator.com').isDisposable()).toBe(true);
      expect(MemberEmailVO.create('x@tempmail.com').isDisposable()).toBe(true);
      expect(MemberEmailVO.create('x@yopmail.com').isDisposable()).toBe(true);
    });

    it('false for real domain', () => {
      expect(MemberEmailVO.create('member@acme.com').isDisposable()).toBe(false);
    });

    it('false for gmail (not in disposable list)', () => {
      expect(MemberEmailVO.create('user@gmail.com').isDisposable()).toBe(false);
    });
  });
});
