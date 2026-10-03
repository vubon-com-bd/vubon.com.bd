/**
 * Validator error path coverage — ZodError → ApplicationValidationError paths
 */
import { OrderValidator } from '../../../../src/module/application/validators/order.validator.js';
import { OrderItemValidator } from '../../../../src/module/application/validators/order-item.validator.js';
import { CheckoutValidator } from '../../../../src/module/application/validators/checkout.validator.js';
import { DeliveryValidator } from '../../../../src/module/application/validators/delivery.validator.js';
import { ReturnValidator } from '../../../../src/module/application/validators/return.validator.js';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';

const UUID_ORDER = '11111111-1111-4111-8111-111111111111';
const UUID_CHECKOUT = '77777777-7777-4777-8777-777777777777';

describe('Validator error paths', () => {
  describe('OrderValidator', () => {
    it('validateCreate rejects bad item shape (missing qty)', () => {
      expect(() => OrderValidator.validateCreate({
        customerId: '22222222-2222-4222-8222-222222222222',
        items: [{ productId: '33333333-3333-4333-8333-333333333333' }],
        shippingAddress: { fullName: 'J', phone: '0', line1: 'x', city: 'y', country: 'BD' },
      })).toThrow(ApplicationValidationError);
    });

    it('validateCreate rejects non-object', () => {
      expect(() => OrderValidator.validateCreate('not-object'))
        .toThrow(ApplicationValidationError);
    });

    it('validateUpdate rejects unknown extra field (strict)', () => {
      expect(() => OrderValidator.validateUpdate({
        orderId: UUID_ORDER,
        bogusField: 'extra',
      })).toThrow(ApplicationValidationError);
    });

    it('validateDelete rejects bad orderId', () => {
      expect(() => OrderValidator.validateDelete({ orderId: 'x' }))
        .toThrow(ApplicationValidationError);
    });

    it('validateConfirm rejects bad orderId', () => {
      expect(() => OrderValidator.validateConfirm({ orderId: 'x' }))
        .toThrow(ApplicationValidationError);
    });

    it('validateRelease rejects bad orderId', () => {
      expect(() => OrderValidator.validateRelease({ orderId: 'x' }))
        .toThrow(ApplicationValidationError);
    });
  });

  describe('OrderItemValidator', () => {
    it('validateAdd rejects negative quantity', () => {
      expect(() => OrderItemValidator.validateAdd({
        orderId: UUID_ORDER,
        productId: '33333333-3333-4333-8333-333333333333',
        sku: 'S',
        name: 'N',
        quantity: -1,
        unitPrice: 100,
      })).toThrow(ApplicationValidationError);
    });

    it('validateUpdate rejects bad itemId', () => {
      expect(() => OrderItemValidator.validateUpdate({
        orderId: UUID_ORDER,
        itemId: 'x',
        quantity: 5,
      })).toThrow(ApplicationValidationError);
    });

    it('validateRemove rejects missing orderId', () => {
      expect(() => OrderItemValidator.validateRemove({
        itemId: '44444444-4444-4444-8444-444444444444',
      })).toThrow(ApplicationValidationError);
    });
  });

  describe('CheckoutValidator', () => {
    it('validateStart rejects bad type enum', () => {
      expect(() => CheckoutValidator.validateStart({
        type: 'invalid_type',
        email: 'c@example.com',
        cartId: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
      })).toThrow(ApplicationValidationError);
    });

    it('validateSelectAddress rejects missing shippingAddress', () => {
      expect(() => CheckoutValidator.validateSelectAddress({
        checkoutId: UUID_CHECKOUT,
      })).toThrow(ApplicationValidationError);
    });

    it('validateSelectShipping rejects missing shippingMethodId', () => {
      expect(() => CheckoutValidator.validateSelectShipping({
        checkoutId: UUID_CHECKOUT,
      })).toThrow(ApplicationValidationError);
    });

    it('validateSelectPayment rejects missing paymentMethod', () => {
      expect(() => CheckoutValidator.validateSelectPayment({
        checkoutId: UUID_CHECKOUT,
      })).toThrow(ApplicationValidationError);
    });

    it('validateAbandon rejects bad checkoutId', () => {
      expect(() => CheckoutValidator.validateAbandon({ checkoutId: 'x' }))
        .toThrow(ApplicationValidationError);
    });
  });

  describe('DeliveryValidator', () => {
    it('validateSchedule rejects missing orderId', () => {
      expect(() => DeliveryValidator.validateSchedule({}))
        .toThrow(ApplicationValidationError);
    });

    it('validateReschedule rejects missing reason', () => {
      expect(() => DeliveryValidator.validateReschedule({
        deliveryId: 'dddddddd-dddd-4ddd-8ddd-dddddddddddd',
        orderId: UUID_ORDER,
      })).toThrow(ApplicationValidationError);
    });

    it('validateConfirm rejects bad orderId', () => {
      expect(() => DeliveryValidator.validateConfirm({
        deliveryId: 'dddddddd-dddd-4ddd-8ddd-dddddddddddd',
        orderId: 'x',
      })).toThrow(ApplicationValidationError);
    });
  });

  describe('ReturnValidator', () => {
    it('validateRequest rejects bad itemIds', () => {
      expect(() => ReturnValidator.validateRequest({
        orderId: UUID_ORDER,
        reason: 'defective',
        itemIds: ['bad'],
      })).toThrow(ApplicationValidationError);
    });

    it('validateApprove rejects bad returnId', () => {
      expect(() => ReturnValidator.validateApprove({
        returnId: 'x',
        orderId: UUID_ORDER,
      })).toThrow(ApplicationValidationError);
    });

    it('validateReject rejects missing reason', () => {
      expect(() => ReturnValidator.validateReject({
        returnId: 'eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee',
        orderId: UUID_ORDER,
      })).toThrow(ApplicationValidationError);
    });

    it('validateComplete rejects bad refundAmount', () => {
      expect(() => ReturnValidator.validateComplete({
        returnId: 'eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee',
        orderId: UUID_ORDER,
        refundAmount: -1,
      })).toThrow(ApplicationValidationError);
    });
  });
});
