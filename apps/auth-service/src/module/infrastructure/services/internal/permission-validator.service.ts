/**
 * PermissionValidatorService
 * @module auth-service/infrastructure/services/internal
 */
import { Injectable } from '@nestjs/common';
import { PermissionNameVO } from '../../../domain/value-objects/primitives/permission-name.vo';
import { PermissionDeniedAppError } from '../../../application/errors/permission.errors';

@Injectable()
export class PermissionValidatorService {
  readonly name = 'PermissionValidatorService';

  assertFormat(permission: string): PermissionNameVO {
    return PermissionNameVO.of(permission);
  }

  assertGranted(granted: boolean, permission: string): void {
    if (!granted) {
      throw new PermissionDeniedAppError(permission);
    }
  }
}
