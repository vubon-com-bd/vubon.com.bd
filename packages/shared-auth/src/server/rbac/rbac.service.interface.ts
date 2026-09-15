export interface RoleAssignment {
  readonly userId: string;
  readonly roles: readonly string[];
  readonly permissions: readonly string[];
}

export interface RbacServiceContract {
  assign(userId: string, roles: readonly string[]): Promise<void>;
  getRoles(userId: string): Promise<readonly string[]>;
  getPermissions(userId: string): Promise<readonly string[]>;
  hasRole(userId: string, role: string): Promise<boolean>;
  hasPermission(userId: string, permission: string): Promise<boolean>;
}
