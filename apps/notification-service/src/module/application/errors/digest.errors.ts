/**
 * Digest Application Errors
 * @module notification-service/application/errors
 */
import {
  ApplicationNotFoundError,
  ApplicationValidationError,
  CommandError,
  QueryError,
} from '@vubon/shared-kernel/application/errors';

export class DigestNotFoundApplicationError extends ApplicationNotFoundError {
  constructor(digestId: string) {
    super('Digest', digestId);
    this.name = 'DigestNotFoundApplicationError';
  }
}

export class DigestValidationError extends ApplicationValidationError {
  constructor(message: string, field?: string) {
    super(message, field);
    this.name = 'DigestValidationError';
  }
}

export class DigestCreationError extends CommandError {
  constructor(reason: string) {
    super(`Digest creation failed: ${reason}`, 'CreateDigest');
    this.name = 'DigestCreationError';
  }
}

export class DigestSendError extends CommandError {
  constructor(digestId: string, reason: string) {
    super(`Digest "${digestId}" send failed: ${reason}`, 'SendDigest');
    this.name = 'DigestSendError';
  }
}

export class DigestQueryError extends QueryError {
  constructor(reason: string) {
    super(`Digest query failed: ${reason}`, 'DigestQuery');
    this.name = 'DigestQueryError';
  }
}
