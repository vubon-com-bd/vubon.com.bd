import {
  DeliveryNotFoundApplicationError,
  DeliverySendError,
  DeliveryRetryError,
  DeliveryMaxRetriesExceededApplicationError,
  DeliveryQueryError,
} from '@application/errors/delivery.errors.js';
import {
  ProviderNotFoundApplicationError,
  ProviderUnavailableApplicationError,
  ProviderWebhookProcessingError,
  ProviderSignatureInvalidError,
} from '@application/errors/provider.errors.js';
import { ApplicationError } from '@vubon/shared-kernel/application/errors';

describe('Delivery + Provider application errors', () => {
  it('Delivery all extend ApplicationError', () => {
    expect(new DeliveryNotFoundApplicationError('d')).toBeInstanceOf(ApplicationError);
    expect(new DeliverySendError('s')).toBeInstanceOf(ApplicationError);
    expect(new DeliveryRetryError('d', 'r')).toBeInstanceOf(ApplicationError);
    expect(new DeliveryMaxRetriesExceededApplicationError('d', 5)).toBeInstanceOf(ApplicationError);
    expect(new DeliveryQueryError('q')).toBeInstanceOf(ApplicationError);
  });

  it('Provider all extend ApplicationError', () => {
    expect(new ProviderNotFoundApplicationError('sendgrid')).toBeInstanceOf(ApplicationError);
    expect(new ProviderUnavailableApplicationError('sendgrid')).toBeInstanceOf(ApplicationError);
    expect(new ProviderWebhookProcessingError('sendgrid', 'p')).toBeInstanceOf(ApplicationError);
    expect(new ProviderSignatureInvalidError('sendgrid')).toBeInstanceOf(ApplicationError);
  });

  it('ProviderUnavailable 503', () => {
    expect(new ProviderUnavailableApplicationError('sendgrid').httpStatus).toBe(503);
  });

  it('ProviderSignatureInvalid 401', () => {
    expect(new ProviderSignatureInvalidError('sendgrid').httpStatus).toBe(401);
  });

  it('ProviderUnavailable with reason', () => {
    const e = new ProviderUnavailableApplicationError('sendgrid', 'down');
    expect(e.message).toContain('down');
  });
});
