/**
 * Data Domain Errors
 * @module analytics-service/domain/errors
 */
import { DomainError } from '@vubon/shared-kernel/domain/errors';
import { ERROR_CODE } from '@vubon/shared-constants/common';

export class DataRetentionExpiredError extends DomainError {
  readonly code = ERROR_CODE.VAL_OUT_OF_RANGE;
  readonly httpStatus = 422;

  constructor(
    public readonly requestedDate: string,
    public readonly retentionDays: number
  ) {
    super(
      `Data at ${requestedDate} exceeds retention policy (${retentionDays} days)`,
      { requestedDate, retentionDays }
    );
    this.name = 'DataRetentionExpiredError';
  }
}

export class InvalidTimeRangeError extends DomainError {
  readonly code = ERROR_CODE.VAL_OUT_OF_RANGE;
  readonly httpStatus = 422;

  constructor(
    public readonly reason: string,
    public readonly startAt?: string,
    public readonly endAt?: string
  ) {
    super(`Invalid time range: ${reason}`, { reason, startAt, endAt });
    this.name = 'InvalidTimeRangeError';
  }
}

export class DataExportLimitError extends DomainError {
  readonly code = ERROR_CODE.VAL_OUT_OF_RANGE;
  readonly httpStatus = 422;

  constructor(
    public readonly requested: number,
    public readonly maxAllowed: number
  ) {
    super(
      `Export limit exceeded: requested ${requested}, max ${maxAllowed}`,
      { requested, maxAllowed }
    );
    this.name = 'DataExportLimitError';
  }
}

export class PiiMaskingRequiredError extends DomainError {
  readonly code = ERROR_CODE.AUTH_FORBIDDEN;
  readonly httpStatus = 422;

  constructor(public readonly fieldName: string) {
    super(`PII field "${fieldName}" must be masked before export`, {
      fieldName,
    });
    this.name = 'PiiMaskingRequiredError';
  }
}

export class AuditTrailRequiredError extends DomainError {
  readonly code = ERROR_CODE.AUTH_FORBIDDEN;
  readonly httpStatus = 422;

  constructor(
    public readonly operation: string,
    public readonly rowCount: number
  ) {
    super(
      `Operation "${operation}" with ${rowCount} rows requires audit trail`,
      { operation, rowCount }
    );
    this.name = 'AuditTrailRequiredError';
  }
}

export class CrossTenantAccessError extends DomainError {
  readonly code = ERROR_CODE.AUTH_FORBIDDEN;
  readonly httpStatus = 403;

  constructor(
    public readonly userTenantId: string,
    public readonly resourceTenantId: string
  ) {
    super(`Cross-tenant access denied`, { userTenantId, resourceTenantId });
    this.name = 'CrossTenantAccessError';
  }
}
