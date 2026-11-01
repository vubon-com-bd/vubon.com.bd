/**
 * ReturnHttpValidator Tests
 * @module order-service/test/unit/interfaces/validators
 */
import { BadRequestException } from '@nestjs/common';
import { ReturnHttpValidator } from '@interfaces/validators/return.validator.js';

describe('ReturnHttpValidator', () => {
  describe('validateRequestReturn', () => {
    it('should pass for valid return request', () => {
      expect(() =>
        ReturnHttpValidator.validateRequestReturn({
          orderId: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
          reason: 'defective',
          itemIds: ['7c9e6679-7425-40de-944b-e07fc1f90ae7'],
        }),
      ).not.toThrow();
    });

    it('should throw for empty body', () => {
      expect(() =>
        ReturnHttpValidator.validateRequestReturn({}),
      ).toThrow(BadRequestException);
    });
  });

  describe('validateRequestCancel', () => {
    it('should throw for empty body', () => {
      expect(() =>
        ReturnHttpValidator.validateRequestCancel({}),
      ).toThrow(BadRequestException);
    });
  });
});
