import { ForbiddenError } from '../errors/forbidden-error';

export class RoleDeniedError extends ForbiddenError {
  public readonly missing: readonly string[];

  constructor(missing: readonly string[]) {
    super('Role denied', { requiredPermission: `role:${missing[0] ?? 'unknown'}` });
    this.name = 'RoleDeniedError';
    this.missing = missing;
  }
}
