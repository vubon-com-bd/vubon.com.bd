/**
 * Provider Application Errors
 * @module notification-service/application/errors
 */
import { ERROR_CODE } from '@vubon/shared-constants/common';
import {
  ApplicationError,
  ApplicationNotFoundError,
  CommandError,
} from '@vubon/shared-kernel/application/errors';

export class ProviderNotFoundApplicationError extends ApplicationNotFoundError {
  constructor(providerName: string) {
    super('Provider', providerName);
    this.name = 'ProviderNotFoundApplicationError';
  }
}

export class ProviderUnavailableApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 503;

  constructor(providerName: string, reason?: string) {
    super(
      `Provider "${providerName}" unavailable${reason ? `: ${reason}` : ''}`,
      { providerName, reason },
    );
    this.name = 'ProviderUnavailableApplicationError';
  }
}

export class ProviderWebhookProcessingError extends CommandError {
  constructor(provider: string, reason: string) {
    super(`Provider "${provider}" webhook processing failed: ${reason}`, 'HandleProviderWebhook');
    this.name = 'ProviderWebhookProcessingError';
  }
}

export class ProviderSignatureInvalidError extends ApplicationError {
  readonly code = ERROR_CODE.AUTH_UNAUTHORIZED;
  readonly httpStatus = 401;

  constructor(provider: string) {
    super(`Provider "${provider}" webhook signature invalid`, { provider });
    this.name = 'ProviderSignatureInvalidError';
  }
}
