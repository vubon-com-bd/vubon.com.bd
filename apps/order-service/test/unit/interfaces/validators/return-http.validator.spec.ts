import { BadRequestException } from '@nestjs/common';
import { ReturnHttpValidator } from '../../../../src/module/interfaces/validators/return.validator.js';

const VALID_REQUEST = {
  orderId: '11111111-1111-4111-8111-111111111111',
  reason: 'defective',
  itemIds: ['44444444-4444-4444-8444-444444444444'],
};

describe('ReturnHttpValidator', () => {
  describe('validateRequest()', () => {
    it('passes valid', () => {
      expect(() => ReturnHttpValidator.validateRequest(VALID_REQUEST)).not.toThrow();
    });

    it('throws on empty itemIds', () => {
      expect(() =>
        ReturnHttpValidator.validateRequest({ ...VALID_REQUEST, itemIds: [] }),
      ).toThrow(BadRequestException);
    });

    it('throws on invalid reason', () => {
      expect(() =>
        ReturnHttpValidator.validateRequest({ ...VALID_REQUEST, reason: 'bogus' }),
      ).toThrow(BadRequestException);
    });
  });

  describe('validateApprove()', () => {
    it('passes valid', () => {
      expect(() =>
        ReturnHttpValidator.validateApprove({
          returnId: 'eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee',
          orderId: '11111111-1111-4111-8111-111111111111',
        }),
      ).not.toThrow();
    });
  });

  describe('validateReject()', () => {
    it('passes valid', () => {
      expect(() =>
        ReturnHttpValidator.validateReject({
          returnId: 'eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee',
          orderId: '11111111-1111-4111-8111-111111111111',
          reason: 'outside window',
        }),
      ).not.toThrow();
    });

    it('throws on missing reason', () => {
      expect(() =>
        ReturnHttpValidator.validateReject({
          returnId: 'eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee',
          orderId: '11111111-1111-4111-8111-111111111111',
        }),
      ).toThrow(BadRequestException);
    });
  });

  describe('validateComplete()', () => {
    it('passes valid', () => {
      expect(() =>
        ReturnHttpValidator.validateComplete({
          returnId: 'eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee',
          orderId: '11111111-1111-4111-8111-111111111111',
          refundAmount: 100,
        }),
      ).not.toThrow();
    });

    it('throws on negative refundAmount', () => {
      expect(() =>
        ReturnHttpValidator.validateComplete({
          returnId: 'eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee',
          orderId: '11111111-1111-4111-8111-111111111111',
          refundAmount: -100,
        }),
      ).toThrow(BadRequestException);
    });
  });
});
