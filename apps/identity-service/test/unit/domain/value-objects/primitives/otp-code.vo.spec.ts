/**
 * OtpCodeVO unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { OtpCodeVO } from '@domain/value-objects/primitives/otp-code.vo.js';
import { InvalidOtpFormatError } from '@domain/errors/verification.errors.js';
import { TEST_OTP_CODE } from '@fixtures/index';

describe('OtpCodeVO', () => {
  it('should create valid 6-digit OTP', () => {
    const vo = OtpCodeVO.create(TEST_OTP_CODE);
    expect(vo.value).toBe(TEST_OTP_CODE);
    expect(vo.length).toBe(6);
  });

  it('should trim whitespace', () => {
    expect(OtpCodeVO.create('  123456  ').value).toBe('123456');
  });

  it('should throw on non-6-digit', () => {
    expect(() => OtpCodeVO.create('12345')).toThrow(InvalidOtpFormatError);
    expect(() => OtpCodeVO.create('1234567')).toThrow(InvalidOtpFormatError);
  });

  it('should throw on non-numeric', () => {
    expect(() => OtpCodeVO.create('abcdef')).toThrow(InvalidOtpFormatError);
  });

  it('should throw on empty', () => {
    expect(() => OtpCodeVO.create('')).toThrow(InvalidOtpFormatError);
  });

  it('should reconstitute without validation', () => {
    expect(OtpCodeVO.reconstitute('x').value).toBe('x');
  });
});
