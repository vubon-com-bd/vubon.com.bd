import { hasPermission } from '../../common/permission/permission.checker';
import { hasRole } from '../../common/role/role.checker';
import type { Role } from '../../common/role/role.types';

export interface PolicyRule {
  readonly action: string;
  readonly resource: string;
  readonly roles?: readonly Role[];
  readonly permissions?: readonly string[];
  readonly ownerOnly?: boolean;
}

export interface PolicyContext {
  readonly userId: string;
  readonly roles: readonly Role[];
  readonly permissions: readonly string[];
  readonly resourceOwnerId?: string;
}

export interface PolicyDecision {
  readonly allowed: boolean;
  readonly matchedRule?: PolicyRule;
  readonly reason?: string;
}

/** Evaluate an ordered list of policy rules. */
export function evaluatePolicy(
  rules: readonly PolicyRule[],
  ctx: PolicyContext,
  action: string,
  resource: string
): PolicyDecision {
  for (const rule of rules) {
    if (rule.action !== action || rule.resource !== resource) continue;

    if (rule.roles && rule.roles.length > 0) {
      if (!hasRole(ctx.roles, rule.roles, 'any')) continue;
    }
    if (rule.permissions && rule.permissions.length > 0) {
      if (!hasPermission(ctx.permissions, rule.permissions, 'all')) continue;
    }
    if (rule.ownerOnly) {
      if (!ctx.resourceOwnerId || ctx.resourceOwnerId !== ctx.userId) continue;
    }
    return { allowed: true, matchedRule: rule };
  }
  return { allowed: false, reason: 'no-matching-rule' };
}
