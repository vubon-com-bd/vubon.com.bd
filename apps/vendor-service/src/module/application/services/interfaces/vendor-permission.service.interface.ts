/**
 * IVendorPermissionService — contract
 * @module vendor-service/application/services/interfaces
 */
export const VENDOR_PERMISSION_SERVICE = Symbol('VENDOR_PERMISSION_SERVICE');

export interface PermissionDTO {
  readonly id: string;
  readonly vendorId: string;
  readonly memberId: string;
  readonly role: string;
  readonly permissions: readonly string[];
  readonly overrides: readonly string[];
  readonly denials: readonly string[];
  readonly effectivePermissions: readonly string[];
  readonly effectiveCount: number;
}

export interface PermissionCheckResultDTO {
  readonly granted: boolean;
  readonly reason: string;
  readonly source: 'role' | 'override' | 'denial' | 'none';
}

export interface IVendorPermissionService {
  grant(memberId: string, permission: string, actorId: string): Promise<PermissionDTO>;
  revoke(memberId: string, permission: string, actorId: string): Promise<PermissionDTO>;
  removeDenial(memberId: string, permission: string, actorId: string): Promise<PermissionDTO>;
  check(memberId: string, permission: string): Promise<PermissionCheckResultDTO>;
  hasPermission(memberId: string, permission: string): Promise<boolean>;
  getByMember(memberId: string): Promise<PermissionDTO | null>;
  listByVendor(vendorId: string): Promise<readonly PermissionDTO[]>;
  getEffectivePermissions(memberId: string): Promise<readonly string[]>;
  groupByNamespace(memberId: string): Promise<Readonly<Record<string, readonly string[]>>>;
}
