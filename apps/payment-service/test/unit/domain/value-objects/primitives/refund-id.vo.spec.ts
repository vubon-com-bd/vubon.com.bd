import { RefundIdVO } from '../../../../../src/module/domain/value-objects/primitives/refund-id.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';

describe('RefundIdVO', () => {
  it('creates from UUID', () => {
    expect(RefundIdVO.create(UUID).value).toBe(UUID);
  });
  it('rejects non-UUID', () => {
    expect(() => RefundIdVO.create('abc')).toThrow(ValidationError);
  });
});
