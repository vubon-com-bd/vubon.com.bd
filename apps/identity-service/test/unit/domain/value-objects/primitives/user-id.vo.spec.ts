/**
 * UserIdVO unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { TEST_IDS } from '@fixtures/index';

describe('UserIdVO', () => {
  it('should create valid', () => {
    expect(UserIdVO.create(TEST_IDS.USER_ID).value).toBe(TEST_IDS.USER_ID);
  });

  it('should throw on empty', () => {
    expect(() => UserIdVO.create('')).toThrow(ValidationError);
  });

  it('should reconstitute without validation', () => {
    expect(UserIdVO.reconstitute('x').value).toBe('x');
  });
});
