import { ReturnValidator } from '../../../../src/module/application/validators/return.validator.js';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';

const VALID_REQ = {
  orderId: '11111111-1111-4111-8111-111111111111',
  reason: 'defective',
  itemIds: ['44444444-4444-4444-8444-444444444444'],
};

describe('ReturnValidator', () => {
  it('validateRequest passes', () => {
    expect(() => ReturnValidator.validateRequest(VALID_REQ)).not.toThrow();
  });

  it('validateRequest throws on empty itemIds', () => {
    expect(() => ReturnValidator.validateRequest({ ...VALID_REQ, itemIds: [] }))
      .toThrow(ApplicationValidationError);
  });

  it('validateRequest throws on bad reason', () => {
    expect(() => ReturnValidator.validateRequest({ ...VALID_REQ, reason: 'bogus' }))
      .toThrow(ApplicationValidationError);
  });

  it('validateApprove passes', () => {
    expect(() => ReturnValidator.validateApprove({
      returnId: 'eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee',
      orderId: '11111111-1111-4111-8111-111111111111',
    })).not.toThrow();
  });

  it('validateReject passes', () => {
    expect(() => ReturnValidator.validateReject({
      returnId: 'eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee',
      orderId: '11111111-1111-4111-8111-111111111111',
      reason: 'outside window',
    })).not.toThrow();
  });

  it('validateComplete passes', () => {
    expect(() => ReturnValidator.validateComplete({
      returnId: 'eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee',
      orderId: '11111111-1111-4111-8111-111111111111',
      refundAmount: 100,
    })).not.toThrow();
  });

  it('validateComplete throws on negative refundAmount', () => {
    expect(() => ReturnValidator.validateComplete({
      returnId: 'eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee',
      orderId: '11111111-1111-4111-8111-111111111111',
      refundAmount: -100,
    })).toThrow(ApplicationValidationError);
  });
});
