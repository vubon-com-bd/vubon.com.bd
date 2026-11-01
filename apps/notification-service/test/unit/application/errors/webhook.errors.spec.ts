import {
  WebhookNotFoundApplicationError,
  WebhookValidationError,
  WebhookCreationError,
  WebhookUpdateError,
  WebhookTestError,
  WebhookQueryError,
} from '@application/errors/webhook.errors.js';
import { ApplicationError } from '@vubon/shared-kernel/application/errors';

describe('Webhook application errors', () => {
  it('all extend ApplicationError', () => {
    expect(new WebhookNotFoundApplicationError('w')).toBeInstanceOf(ApplicationError);
    expect(new WebhookValidationError('x')).toBeInstanceOf(ApplicationError);
    expect(new WebhookCreationError('c')).toBeInstanceOf(ApplicationError);
    expect(new WebhookUpdateError('w', 'u')).toBeInstanceOf(ApplicationError);
    expect(new WebhookTestError('w', 't')).toBeInstanceOf(ApplicationError);
    expect(new WebhookQueryError('q')).toBeInstanceOf(ApplicationError);
  });
});
