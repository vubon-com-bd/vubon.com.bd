import type { RbacServiceContract } from './rbac.service.interface';
import { userHasPermission } from './permission.service';
import { roleHasRole } from './role.service';

/**
 * Server-side RBAC service.
 * ⚠️ SERVER-ONLY. The authoritative source of truth.
 */
export class RbacService implements RbacServiceContract {
  private readonly roles = new Map<string, Set<string>>();
  private readonly perms = new Map<string, Set<string>>();

  async assign(userId: string, roles: readonly string[]): Promise<void> {
    this.roles.set(userId, new Set(roles));
  }

  async getRoles(userId: string): Promise<readonly string[]> {
    return [...(this.roles.get(userId) ?? [])];
  }

  async getPermissions(userId: string): Promise<readonly string[]> {
    return [...(this.perms.get(userId) ?? [])];
  }

  async hasRole(userId: string, role: string): Promise<boolean> {
    const roles = [...(this.roles.get(userId) ?? [])] as never;
    return roleHasRole(roles, role as never);
  }

  async hasPermission(userId: string, permission: string): Promise<boolean> {
    const perms = [...(this.perms.get(userId) ?? [])];
    return userHasPermission(perms, permission, 'all');
  }

  /** Grant permissions (usually derived from roles — app decides). */
  async grantPermissions(userId: string, permissions: readonly string[]): Promise<void> {
    this.perms.set(userId, new Set(permissions));
  }
}

export const rbacService = new RbacService();
