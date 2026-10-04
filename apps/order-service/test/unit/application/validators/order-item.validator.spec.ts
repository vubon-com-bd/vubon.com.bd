import { OrderItemValidator } from '../../../../src/module/application/validators/order-item.validator.js';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';

const VALID_ADD = {
  orderId: '11111111-1111-4111-8111-111111111111',
  productId: '33333333-3333-4333-8333-333333333333',
  sku: 'SKU-001',
  name: 'Product',
  quantity: 2,
  unitPrice: 100,
};

describe('OrderItemValidator', () => {
  it('validateAdd passes', () => {
    expect(() => OrderItemValidator.validateAdd(VALID_ADD)).not.toThrow();
  });

  it('validateAdd throws on bad productId', () => {
    expect(() => OrderItemValidator.validateAdd({ ...VALID_ADD, productId: 'x' }))
      .toThrow(ApplicationValidationError);
  });

  it('validateAdd throws on missing sku', () => {
    const { sku: _s, ...rest } = VALID_ADD;
    expect(() => OrderItemValidator.validateAdd(rest)).toThrow(ApplicationValidationError);
  });

  it('validateUpdate passes', () => {
    expect(() => OrderItemValidator.validateUpdate({
      orderId: '11111111-1111-4111-8111-111111111111',
      itemId: '44444444-4444-4444-8444-444444444444',
      quantity: 5,
    })).not.toThrow();
  });

  it('validateRemove passes', () => {
    expect(() => OrderItemValidator.validateRemove({
      orderId: '11111111-1111-4111-8111-111111111111',
      itemId: '44444444-4444-4444-8444-444444444444',
    })).not.toThrow();
  });

  it('validateRemove throws on missing itemId', () => {
    expect(() => OrderItemValidator.validateRemove({
      orderId: '11111111-1111-4111-8111-111111111111',
    })).toThrow(ApplicationValidationError);
  });
});
