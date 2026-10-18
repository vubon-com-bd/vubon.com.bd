/**
 * VerificationIdVO unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { VerificationIdVO } from '@domain/value-objects/primitives/verification-id.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { TEST_IDS } from '@fixtures/index';

describe('VerificationIdVO', () => {
  it('should create valid', () => {
    expect(VerificationIdVO.create(TEST_IDS.VERIFICATION_ID).value).toBe(TEST_IDS.VERIFICATION_ID);
  });

  it('should throw on empty', () => {
    expect(() => VerificationIdVO.create('')).toThrow(ValidationError);
  });

  it('should reconstitute without validation', () => {
    expect(VerificationIdVO.reconstitute('x').value).toBe('x');
  });
});
