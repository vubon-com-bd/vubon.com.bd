import { WebhookValidator } from '@application/validators/webhook.validator.js';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors';
import { WEBHOOK_DTO } from '@application-fixtures/dtos.fixture.js';

describe('WebhookValidator', () => {
  it('validateCreate accepts valid', () => {
    expect(() => WebhookValidator.validateCreate(WEBHOOK_DTO.create)).not.toThrow();
  });

  it('validateCreate rejects empty', () => {
    expect(() => WebhookValidator.validateCreate({})).toThrow(ApplicationValidationError);
  });

  it('validateCreate rejects invalid url', () => {
    expect(() => WebhookValidator.validateCreate({ ...WEBHOOK_DTO.create, url: 'not-url' }))
      .toThrow(ApplicationValidationError);
  });

  it('validateCreate rejects empty events', () => {
    expect(() => WebhookValidator.validateCreate({ ...WEBHOOK_DTO.create, events: [] }))
      .toThrow(ApplicationValidationError);
  });

  it('validateUpdate accepts valid', () => {
    expect(() => WebhookValidator.validateUpdate(WEBHOOK_DTO.update)).not.toThrow();
  });

  it('validateUpdate rejects no-op', () => {
    expect(() => WebhookValidator.validateUpdate({ webhookId: WEBHOOK_DTO.update.webhookId }))
      .toThrow(ApplicationValidationError);
  });

  it('validateTest accepts valid', () => {
    expect(() => WebhookValidator.validateTest(WEBHOOK_DTO.test)).not.toThrow();
  });

  it('validateTest rejects bad event', () => {
    expect(() => WebhookValidator.validateTest({ ...WEBHOOK_DTO.test, event: 'invalid.event' }))
      .toThrow(ApplicationValidationError);
  });

  it('non-Zod error rethrown', () => {
    expect(() => WebhookValidator.validateCreate(null)).toThrow();
  });
});
