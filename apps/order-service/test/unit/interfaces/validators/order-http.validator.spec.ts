import { BadRequestException } from '@nestjs/common';
import { OrderHttpValidator } from '../../../../src/module/interfaces/validators/order.validator.js';

const VALID_CREATE = {
  customerId: '22222222-2222-4222-8222-222222222222',
  items: [
    {
      productId: '33333333-3333-4333-8333-333333333333',
      quantity: 2,
      unitPrice: 100,
    },
  ],
  shippingAddress: {
    fullName: 'John',
    phone: '01700000000',
    line1: '123 Main St',
    city: 'Dhaka',
    country: 'BD',
  },
};

describe('OrderHttpValidator', () => {
  describe('validateCreate()', () => {
    it('passes valid input', () => {
      expect(() => OrderHttpValidator.validateCreate(VALID_CREATE)).not.toThrow();
    });

    it('throws BadRequestException on missing customerId', () => {
      expect(() =>
        OrderHttpValidator.validateCreate({ ...VALID_CREATE, customerId: undefined }),
      ).toThrow(BadRequestException);
    });

    it('throws on empty items array', () => {
      expect(() =>
        OrderHttpValidator.validateCreate({ ...VALID_CREATE, items: [] }),
      ).toThrow(BadRequestException);
    });

    it('throws on invalid productId format', () => {
      expect(() =>
        OrderHttpValidator.validateCreate({
          ...VALID_CREATE,
          items: [{ productId: 'not-uuid', quantity: 1, unitPrice: 100 }],
        }),
      ).toThrow(BadRequestException);
    });

    it('throws on quantity > 999', () => {
      expect(() =>
        OrderHttpValidator.validateCreate({
          ...VALID_CREATE,
          items: [{ productId: '33333333-3333-4333-8333-333333333333', quantity: 1000, unitPrice: 100 }],
        }),
      ).toThrow(BadRequestException);
    });
  });

  describe('validateUpdate()', () => {
    it('passes with valid orderId + notes', () => {
      expect(() =>
        OrderHttpValidator.validateUpdate({
          orderId: '11111111-1111-4111-8111-111111111111',
          notes: 'updated',
        }),
      ).not.toThrow();
    });

    it('throws on invalid orderId', () => {
      expect(() =>
        OrderHttpValidator.validateUpdate({ orderId: 'bad' }),
      ).toThrow(BadRequestException);
    });
  });

  describe('validateHold()', () => {
    it('passes with reason', () => {
      expect(() =>
        OrderHttpValidator.validateHold({
          orderId: '11111111-1111-4111-8111-111111111111',
          reason: 'waiting',
        }),
      ).not.toThrow();
    });

    it('throws on missing reason', () => {
      expect(() =>
        OrderHttpValidator.validateHold({ orderId: '11111111-1111-4111-8111-111111111111' }),
      ).toThrow(BadRequestException);
    });
  });

  describe('validateRelease()', () => {
    it('passes with orderId only', () => {
      expect(() =>
        OrderHttpValidator.validateRelease({
          orderId: '11111111-1111-4111-8111-111111111111',
        }),
      ).not.toThrow();
    });
  });
});
