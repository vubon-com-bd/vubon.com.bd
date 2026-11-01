import { ActionIdVO } from '@domain/primitives/action-id.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('ActionIdVO', () => {
  it('accepts valid id', () => {
    expect(ActionIdVO.create('accept-btn').value).toBe('accept-btn');
  });
  it('trims', () => {
    expect(ActionIdVO.create('  x  ').value).toBe('x');
  });
  it('rejects empty', () => {
    expect(() => ActionIdVO.create('')).toThrow(ValidationError);
  });
  it('rejects >64 chars', () => {
    expect(() => ActionIdVO.create('a'.repeat(65))).toThrow(ValidationError);
  });
  it('reconstitute', () => {
    expect(ActionIdVO.reconstitute('x').value).toBe('x');
  });
});
