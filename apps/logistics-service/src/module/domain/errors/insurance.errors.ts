import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';

export class InsuranceNotAvailableError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.INSURANCE_NOT_AVAILABLE;
  readonly httpStatus = 400;

  constructor(shipmentId: string) {
    super(`Insurance not available: ${shipmentId}`, { shipmentId });
  }
}

export class InsuranceClaimFailedError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.INSURANCE_CLAIM_FAILED;
  readonly httpStatus = 500;

  constructor(insuranceId: string, reason: string) {
    super(`Insurance claim failed: ${reason}`, { insuranceId, reason });
  }
}
