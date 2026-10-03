import { DeliveryValidator } from '../../../../src/module/application/validators/delivery.validator.js';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';

describe('DeliveryValidator', () => {
  it('validateSchedule passes', () => {
    expect(() => DeliveryValidator.validateSchedule({
      orderId: '11111111-1111-4111-8111-111111111111',
      type: 'standard',
    })).not.toThrow();
  });

  it('validateSchedule throws on bad orderId', () => {
    expect(() => DeliveryValidator.validateSchedule({
      orderId: 'bad', type: 'standard',
    })).toThrow(ApplicationValidationError);
  });

  it('validateReschedule passes', () => {
    expect(() => DeliveryValidator.validateReschedule({
      deliveryId: 'dddddddd-dddd-4ddd-8ddd-dddddddddddd',
      orderId: '11111111-1111-4111-8111-111111111111',
      reason: 'customer request',
    })).not.toThrow();
  });

  it('validateConfirm passes', () => {
    expect(() => DeliveryValidator.validateConfirm({
      deliveryId: 'dddddddd-dddd-4ddd-8ddd-dddddddddddd',
      orderId: '11111111-1111-4111-8111-111111111111',
    })).not.toThrow();
  });
});
