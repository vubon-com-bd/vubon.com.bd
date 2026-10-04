import { hasPermission } from '../../common/permission/permission.checker';
import { hasRole } from '../../common/role/role.checker';
import type { RbacResource, RbacRule, RbacSubject } from './rbac.types';

export interface RbacCheckContext {
  readonly subject: RbacSubject;
  readonly resource: RbacResource;
  readonly subjectId: string;
}

/**
 * Cross-platform RBAC matcher.
 * Evaluates an RbacRule against subject + resource.
 */
export function matchesRule(rule: RbacRule, ctx: RbacCheckContext): boolean {
  if (rule.resourceType !== ctx.resource.type) return false;

  if (rule.requiredRoles && rule.requiredRoles.length > 0) {
    if (!hasRole(ctx.subject.roles, rule.requiredRoles, 'any')) return false;
  }

  if (rule.requiredPermissions && rule.requiredPermissions.length > 0) {
    if (!hasPermission(ctx.subject.permissions, rule.requiredPermissions, 'all')) {
      return false;
    }
  }

  if (rule.ownerOnly) {
    if (!ctx.resource.ownerId || ctx.resource.ownerId !== ctx.subjectId) {
      return false;
    }
  }

  return true;
}
