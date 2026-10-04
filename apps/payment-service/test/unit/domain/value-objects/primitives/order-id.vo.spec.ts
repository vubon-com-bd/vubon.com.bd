import { OrderIdVO } from '../../../../../src/module/domain/value-objects/primitives/order-id.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';

describe('OrderIdVO', () => {
  it('creates from UUID', () => {
    expect(OrderIdVO.create(UUID).value).toBe(UUID);
  });
  it('rejects non-UUID', () => {
    expect(() => OrderIdVO.create('abc')).toThrow(ValidationError);
  });
});
