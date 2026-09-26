import { hasRole as commonHasRole } from '../../common/role/role.checker';
import type { Role } from '../../common/role/role.types';

export function roleHasRole(userRoles: readonly Role[], required: Role | readonly Role[]): boolean {
  return commonHasRole(userRoles, required, 'any');
}
