import { OrderIdVO } from '@domain/primitives/order-id.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { IDS } from '@domain-fixtures/ids.fixture.js';

describe('OrderIdVO', () => {
  it('creates valid', () => {
    expect(OrderIdVO.create(IDS.orderId).value).toBe(IDS.orderId);
  });
  it('rejects empty', () => {
    expect(() => OrderIdVO.create('')).toThrow(ValidationError);
  });
  it('rejects non-string', () => {
    expect(() => OrderIdVO.create({} as any)).toThrow(ValidationError);
  });
  it('branded round-trip', () => {
    const vo = OrderIdVO.create(IDS.orderId);
    expect(OrderIdVO.fromBranded(vo.toBranded()).value).toBe(IDS.orderId);
  });
});
