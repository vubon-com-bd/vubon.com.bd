/**
 * GuestTokenVO extended tests
 */
import { describe, it, expect } from '@jest/globals';
import { GuestTokenVO } from '@domain/value-objects/primitives/guest-token.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('GuestTokenVO — extended', () => {
  it('create() accepts valid token', () => {
    const vo = GuestTokenVO.create('abc123def456ghi7');
    expect(vo.value).toBe('abc123def456ghi7');
    expect(vo.length).toBe(16);
  });

  it('throws if too short', () => {
    expect(() => GuestTokenVO.create('short')).toThrow(ValidationError);
  });

  it('throws if too long', () => {
    expect(() => GuestTokenVO.create('x'.repeat(129))).toThrow(ValidationError);
  });

  it('throws on invalid characters', () => {
    expect(() => GuestTokenVO.create('invalid token with spaces!!')).toThrow(ValidationError);
  });

  it('throws on non-string', () => {
    expect(() => GuestTokenVO.create(123 as never)).toThrow(ValidationError);
  });

  it('isStrong() for 32+ chars', () => {
    expect(GuestTokenVO.create('x'.repeat(32)).isStrong()).toBe(true);
    expect(GuestTokenVO.create('x'.repeat(16)).isStrong()).toBe(false);
  });

  it('reconstitute() bypasses validation', () => {
    expect(GuestTokenVO.reconstitute('any').value).toBe('any');
  });
});
