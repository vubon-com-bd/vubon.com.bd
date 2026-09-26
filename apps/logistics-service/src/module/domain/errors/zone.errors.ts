import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';

export class ZoneNotCoveredError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.ZONE_NOT_COVERED;
  readonly httpStatus = 400;

  constructor(division: string, district: string) {
    super(`Zone not covered: ${division}/${district}`, { division, district });
  }
}

export class ZoneNotFoundError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.ZONE_NOT_FOUND;
  readonly httpStatus = 404;

  constructor(zoneId: string) {
    super(`Zone not found: ${zoneId}`, { zoneId });
  }
}
