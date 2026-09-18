import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';
import type { ErrorCodeType } from '@vubon/shared-constants/common';

export class PermissionDeniedError extends DomainError {
  readonly code: ErrorCodeType = 'AUTH-005';
  readonly httpStatus = 403;

  constructor(permission: string) {
    super(`Permission denied: ${permission}`, { permission });
  }
}

export class InvalidRoleError extends DomainError {
  readonly code: ErrorCodeType = 'VAL-001';
  readonly httpStatus = 422;

  constructor(role: string) {
    super(`Invalid role: ${role}`, { role });
  }
}
