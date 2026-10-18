/**
 * UserAgentVO unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { UserAgentVO } from '@domain/value-objects/primitives/user-agent.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { TEST_USER_AGENT } from '@fixtures/index';

describe('UserAgentVO', () => {
  it('should create valid', () => {
    expect(UserAgentVO.create(TEST_USER_AGENT).value).toBe(TEST_USER_AGENT);
  });

  it('should trim', () => {
    expect(UserAgentVO.create('  test  ').value).toBe('test');
  });

  it('should throw on empty', () => {
    expect(() => UserAgentVO.create('')).toThrow(ValidationError);
  });

  it('should throw on too long', () => {
    expect(() => UserAgentVO.create('a'.repeat(600))).toThrow(ValidationError);
  });

  it('should reconstitute without validation', () => {
    expect(UserAgentVO.reconstitute('x').value).toBe('x');
  });
});
