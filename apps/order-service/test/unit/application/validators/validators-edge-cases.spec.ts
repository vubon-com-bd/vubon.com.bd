/**
 * Validators Edge Cases — Branch Coverage
 * @module order-service/test/unit/application/validators
 */
import { describe, it, expect } from '@jest/globals';
import { DeliveryValidator } from '@application/validators/delivery.validator.js';
import { ReturnValidator } from '@application/validators/return.validator.js';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';

const ID = '550e8400-e29b-41d4-a716-446655440000';

describe('DeliveryValidator edge cases', () => {
  it('validateReschedule throws for missing deliveryId', () => {
    expect(() =>
      DeliveryValidator.validateReschedule({ orderId: ID, reason: 'valid reason' }),
    ).toThrow(ApplicationValidationError);
  });

  it('validateReschedule throws for long reason', () => {
    expect(() =>
      DeliveryValidator.validateReschedule({
        deliveryId: ID,
        orderId: ID,
        reason: 'x'.repeat(501),
      }),
    ).toThrow(ApplicationValidationError);
  });

  it('validateConfirm rejects missing ids', () => {
    expect(() => DeliveryValidator.validateConfirm({})).toThrow();
  });

  it('validateConfirm rejects bad uuid', () => {
    expect(() =>
      DeliveryValidator.validateConfirm({ deliveryId: 'bad', orderId: 'bad' }),
    ).toThrow();
  });

  it('validateSchedule rejects bad uuid', () => {
    expect(() =>
      DeliveryValidator.validateSchedule({ orderId: 'bad-uuid' }),
    ).toThrow();
  });
});

describe('ReturnValidator edge cases', () => {
  it('validateRequestReturn rejects missing orderId', () => {
    expect(() =>
      ReturnValidator.validateRequestReturn({ reason: 'defective', itemIds: [ID] }),
    ).toThrow();
  });

  it('validateCompleteReturn rejects missing returnId', () => {
    expect(() =>
      ReturnValidator.validateCompleteReturn({ orderId: ID, refundAmount: 10 }),
    ).toThrow();
  });

  it('validateApproveReturn rejects bad uuid', () => {
    expect(() =>
      ReturnValidator.validateApproveReturn({ returnId: 'bad', orderId: 'bad' }),
    ).toThrow();
  });

  it('validateRequestCancel rejects invalid reason', () => {
    expect(() =>
      ReturnValidator.validateRequestCancel({ orderId: ID, reason: 'not-a-reason' }),
    ).toThrow();
  });

  it('validateRejectCancel rejects short reason', () => {
    expect(() =>
      ReturnValidator.validateRejectCancel({ cancelId: ID, orderId: ID, reason: 'x' }),
    ).toThrow();
  });
});
