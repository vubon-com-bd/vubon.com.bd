import type { Role } from '../../common/role/role.types';

export interface RbacSubject {
  readonly roles: readonly Role[];
  readonly permissions: readonly string[];
}

export interface RbacResource {
  readonly type: string;
  readonly ownerId?: string;
}

export interface RbacRule {
  readonly action: string;
  readonly resourceType: string;
  readonly requiredRoles?: readonly Role[];
  readonly requiredPermissions?: readonly string[];
  readonly ownerOnly?: boolean;
}
