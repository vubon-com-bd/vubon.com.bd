/**
 * MfaIdVO unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { MfaIdVO } from '@domain/value-objects/primitives/mfa-id.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { TEST_IDS } from '@fixtures/index';

describe('MfaIdVO', () => {
  it('should create valid', () => {
    expect(MfaIdVO.create(TEST_IDS.MFA_ID).value).toBe(TEST_IDS.MFA_ID);
  });

  it('should throw on empty', () => {
    expect(() => MfaIdVO.create('')).toThrow(ValidationError);
  });

  it('should reconstitute without validation', () => {
    expect(MfaIdVO.reconstitute('x').value).toBe('x');
  });
});
