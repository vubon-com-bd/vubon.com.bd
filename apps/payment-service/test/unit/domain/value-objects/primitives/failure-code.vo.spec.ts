import { FailureCodeVO } from '../../../../../src/module/domain/value-objects/primitives/failure-code.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('FailureCodeVO', () => {
  it('creates and uppercases', () => {
    expect(FailureCodeVO.create('gw_timeout').value).toBe('GW_TIMEOUT');
  });
  it('rejects empty', () => {
    expect(() => FailureCodeVO.create('')).toThrow(ValidationError);
  });
  it('rejects invalid chars (lowercase, spaces)', () => {
    expect(() => FailureCodeVO.create('has space')).toThrow(ValidationError);
    expect(() => FailureCodeVO.create('bad!char')).toThrow(ValidationError);
  });
  it('accepts A-Z 0-9 _ -', () => {
    expect(() => FailureCodeVO.create('ABC-123_XYZ')).not.toThrow();
  });
  it('rejects too long (>50)', () => {
    expect(() => FailureCodeVO.create('A'.repeat(51))).toThrow(ValidationError);
  });
});
