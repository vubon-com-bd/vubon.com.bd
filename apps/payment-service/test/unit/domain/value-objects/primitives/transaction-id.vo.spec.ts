import { TransactionIdVO } from '../../../../../src/module/domain/value-objects/primitives/transaction-id.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';

describe('TransactionIdVO', () => {
  it('creates from UUID', () => {
    expect(TransactionIdVO.create(UUID).value).toBe(UUID);
  });
  it('rejects non-UUID', () => {
    expect(() => TransactionIdVO.create('abc')).toThrow(ValidationError);
  });
  it('rejects empty', () => {
    expect(() => TransactionIdVO.create('')).toThrow(ValidationError);
  });
});
