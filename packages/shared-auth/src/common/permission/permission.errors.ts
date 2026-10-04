import { ForbiddenError } from '../errors/forbidden-error';

export class PermissionDeniedError extends ForbiddenError {
  public readonly missing: readonly string[];

  constructor(missing: readonly string[]) {
    super('Permission denied', {
      requiredPermission: missing[0],
    });
    this.name = 'PermissionDeniedError';
    this.missing = missing;
  }
}
