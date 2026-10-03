import { OrderValidator } from '../../../../src/module/application/validators/order.validator.js';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';

const VALID = {
  customerId: '22222222-2222-4222-8222-222222222222',
  items: [
    { productId: '33333333-3333-4333-8333-333333333333', quantity: 2, unitPrice: 100 },
  ],
  shippingAddress: {
    fullName: 'John', phone: '01700000000', line1: '123 Main', city: 'Dhaka', country: 'BD',
  },
};

describe('OrderValidator', () => {
  it('validateCreate passes valid', () => {
    expect(() => OrderValidator.validateCreate(VALID)).not.toThrow();
  });

  it('validateCreate throws ApplicationValidationError on bad UUID', () => {
    expect(() => OrderValidator.validateCreate({ ...VALID, customerId: 'bad' }))
      .toThrow(ApplicationValidationError);
  });

  it('validateCreate throws on empty items', () => {
    expect(() => OrderValidator.validateCreate({ ...VALID, items: [] }))
      .toThrow(ApplicationValidationError);
  });

  it('validateUpdate passes', () => {
    expect(() => OrderValidator.validateUpdate({
      orderId: '11111111-1111-4111-8111-111111111111',
      notes: 'updated',
    })).not.toThrow();
  });

  it('validateUpdate throws on bad orderId', () => {
    expect(() => OrderValidator.validateUpdate({ orderId: 'bad' }))
      .toThrow(ApplicationValidationError);
  });

  it('validateDelete passes', () => {
    expect(() => OrderValidator.validateDelete({
      orderId: '11111111-1111-4111-8111-111111111111',
    })).not.toThrow();
  });

  it('validateConfirm passes', () => {
    expect(() => OrderValidator.validateConfirm({
      orderId: '11111111-1111-4111-8111-111111111111',
    })).not.toThrow();
  });

  it('validateHold passes', () => {
    expect(() => OrderValidator.validateHold({
      orderId: '11111111-1111-4111-8111-111111111111',
      reason: 'waiting',
    })).not.toThrow();
  });

  it('validateHold throws on missing reason', () => {
    expect(() => OrderValidator.validateHold({
      orderId: '11111111-1111-4111-8111-111111111111',
    })).toThrow(ApplicationValidationError);
  });

  it('validateRelease passes', () => {
    expect(() => OrderValidator.validateRelease({
      orderId: '11111111-1111-4111-8111-111111111111',
    })).not.toThrow();
  });
});
