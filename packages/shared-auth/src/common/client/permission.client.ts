/**
 * Permission Client
 * পারমিশন ক্লায়েন্ট
 */
export interface Permission {
  id: string;
  name: string;
  description?: string;
  resource: string;
  action: string;
  conditions?: Record<string, unknown>;
}

export interface Role {
  id: string;
  name: string;
  description?: string;
  permissions: Permission[];
  isDefault: boolean;
}

export interface PermissionCheck {
  resource: string;
  action: string;
  attributes?: Record<string, unknown>;
}

export class PermissionClient {
  private permissions: Permission[] = [];
  private roles: Role[] = [];

  constructor(permissions: Permission[] = [], roles: Role[] = []) {
    this.permissions = permissions;
    this.roles = roles;
  }

  setPermissions(permissions: Permission[]): void {
    this.permissions = permissions;
  }

  setRoles(roles: Role[]): void {
    this.roles = roles;
  }

  hasPermission(check: PermissionCheck): boolean {
    return this.permissions.some(
      (p) =>
        p.resource === check.resource &&
        p.action === check.action &&
        this.checkConditions(p.conditions, check.attributes)
    );
  }

  hasAnyPermission(checks: PermissionCheck[]): boolean {
    return checks.some((check) => this.hasPermission(check));
  }

  hasAllPermissions(checks: PermissionCheck[]): boolean {
    return checks.every((check) => this.hasPermission(check));
  }

  hasRole(roleName: string): boolean {
    return this.roles.some((r) => r.name === roleName);
  }

  hasAnyRole(roleNames: string[]): boolean {
    return roleNames.some((name) => this.hasRole(name));
  }

  hasAllRoles(roleNames: string[]): boolean {
    return roleNames.every((name) => this.hasRole(name));
  }

  getPermissionsForResource(resource: string): Permission[] {
    return this.permissions.filter((p) => p.resource === resource);
  }

  getActionsForResource(resource: string): string[] {
    return this.permissions.filter((p) => p.resource === resource).map((p) => p.action);
  }

  getRolePermissions(roleName: string): Permission[] {
    const role = this.roles.find((r) => r.name === roleName);
    return role ? role.permissions : [];
  }

  getUserPermissions(): Permission[] {
    return this.permissions;
  }

  getUserRoles(): Role[] {
    return this.roles;
  }

  canManageResource(resource: string): boolean {
    const actions = ['create', 'read', 'update', 'delete'];
    return actions.every((action) => this.hasPermission({ resource, action }));
  }

  canViewResource(resource: string): boolean {
    return this.hasPermission({ resource, action: 'read' });
  }

  canEditResource(resource: string): boolean {
    return this.hasPermission({ resource, action: 'update' });
  }

  canDeleteResource(resource: string): boolean {
    return this.hasPermission({ resource, action: 'delete' });
  }

  canCreateResource(resource: string): boolean {
    return this.hasPermission({ resource, action: 'create' });
  }

  private checkConditions(
    conditions?: Record<string, unknown>,
    attributes?: Record<string, unknown>
  ): boolean {
    if (!conditions) return true;
    if (!attributes) return false;

    for (const [key, value] of Object.entries(conditions)) {
      if (attributes[key] !== value) {
        return false;
      }
    }
    return true;
  }

  getPermissionsSummary(): {
    totalPermissions: number;
    totalRoles: number;
    resources: Record<string, string[]>;
  } {
    const resources: Record<string, string[]> = {};
    for (const permission of this.permissions) {
      if (!resources[permission.resource]) {
        resources[permission.resource] = [];
      }
      if (!resources[permission.resource].includes(permission.action)) {
        resources[permission.resource].push(permission.action);
      }
    }

    return {
      totalPermissions: this.permissions.length,
      totalRoles: this.roles.length,
      resources,
    };
  }
}

export const createPermissionClient = (
  permissions?: Permission[],
  roles?: Role[]
): PermissionClient => {
  return new PermissionClient(permissions, roles);
};
