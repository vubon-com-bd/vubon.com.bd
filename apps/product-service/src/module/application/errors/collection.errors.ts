/**
 * Collection Application Errors
 * @module product-service/application/errors
 */
import { ERROR_CODE } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors';
import { ApplicationNotFoundError } from '@vubon/shared-kernel/application/errors';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors';
import { CommandError } from '@vubon/shared-kernel/application/errors';
import { QueryError } from '@vubon/shared-kernel/application/errors';

export class CollectionNotFoundApplicationError extends ApplicationNotFoundError {
  constructor(collectionId: string) {
    super('Collection', collectionId);
    this.name = 'CollectionNotFoundApplicationError';
  }
}

export class CollectionValidationError extends ApplicationValidationError {
  constructor(message: string, field?: string) {
    super(message, field);
    this.name = 'CollectionValidationError';
  }
}

export class CollectionCreateError extends CommandError {
  constructor(reason: string) {
    super(`Collection creation failed: ${reason}`, 'CreateCollection');
    this.name = 'CollectionCreateError';
  }
}

export class CollectionUpdateError extends CommandError {
  constructor(collectionId: string, reason: string) {
    super(`Collection "${collectionId}" update failed: ${reason}`, 'UpdateCollection');
    this.name = 'CollectionUpdateError';
  }
}

export class CollectionSlugConflictApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.VAL_DUPLICATE;
  readonly httpStatus = 409;

  constructor(slug: string) {
    super(`Collection slug "${slug}" already exists`, { slug });
    this.name = 'CollectionSlugConflictApplicationError';
  }
}

export class CollectionQueryError extends QueryError {
  constructor(reason: string) {
    super(`Collection query failed: ${reason}`, 'CollectionQuery');
    this.name = 'CollectionQueryError';
  }
}
