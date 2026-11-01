import { hasPermission as commonHasPermission } from '../../common/permission/permission.checker';

export function userHasPermission(
  userPermissions: readonly string[],
  required: string | readonly string[],
  mode: 'any' | 'all' = 'all'
): boolean {
  return commonHasPermission(userPermissions, required, mode);
}
