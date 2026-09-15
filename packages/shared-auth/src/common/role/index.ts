export type { Role, RoleCheckContext, RoleHierarchy } from './role.types';
export { RoleDeniedError } from './role.errors';
export { ROLE_HIERARCHY, getInheritedRoles } from './role.hierarchy';
export { hasRole, checkRole, assertRole } from './role.checker';
export { matchesRolePattern, buildRoleMatcher } from './role.matcher';
export type { RoleMatcher } from './role.matcher';
export { listAllRoles, isAdminRole, isVendorRole, roleLabel } from './role.utils';
