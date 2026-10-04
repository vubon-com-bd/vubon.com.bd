import { FailureReasonVO } from '../../../../../src/module/domain/value-objects/primitives/failure-reason.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('FailureReasonVO', () => {
  it('creates valid', () => {
    expect(FailureReasonVO.create('gateway timeout').value).toBe('gateway timeout');
  });
  it('rejects empty', () => {
    expect(() => FailureReasonVO.create('')).toThrow(ValidationError);
  });
  it('rejects too long (>500)', () => {
    expect(() => FailureReasonVO.create('a'.repeat(501))).toThrow(ValidationError);
  });
});
