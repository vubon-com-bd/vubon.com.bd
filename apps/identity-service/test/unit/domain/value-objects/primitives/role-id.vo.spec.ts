/**
 * RoleIdVO unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { RoleIdVO } from '@domain/value-objects/primitives/role-id.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { TEST_IDS } from '@fixtures/index';

describe('RoleIdVO', () => {
  it('should create valid', () => {
    expect(RoleIdVO.create(TEST_IDS.ROLE_ID).value).toBe(TEST_IDS.ROLE_ID);
  });

  it('should throw on empty', () => {
    expect(() => RoleIdVO.create('')).toThrow(ValidationError);
  });

  it('should reconstitute without validation', () => {
    expect(RoleIdVO.reconstitute('x').value).toBe('x');
  });
});
