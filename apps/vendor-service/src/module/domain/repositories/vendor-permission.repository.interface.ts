/**
 * Vendor Permission Repository Interface
 * @module vendor-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { VendorPermissionEntity } from '../entities/vendor-permission.entity.js';
import type { VendorIdVO } from '../value-objects/primitives/vendor-id.vo.js';
import type { TeamMemberIdVO } from '../value-objects/primitives/team-member-id.vo.js';
import type { PermissionIdVO } from '../value-objects/primitives/permission-id.vo.js';

export const VENDOR_PERMISSION_REPOSITORY = Symbol('VENDOR_PERMISSION_REPOSITORY');

export interface VendorPermissionListFilter {
  readonly vendorId?: string;
  readonly memberId?: string;
  readonly role?: string | readonly string[];
  readonly hasOverrides?: boolean;
  readonly hasDenials?: boolean;
  readonly hasPermission?: string;
  readonly namespace?: string;
  readonly grantedFrom?: string;
  readonly grantedTo?: string;
}

export interface VendorPermissionListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'grantedAt' | 'effectiveCount';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: VendorPermissionListFilter;
}

export interface VendorPermissionPaginationResult {
  readonly items: readonly VendorPermissionEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface VendorPermissionRepository
  extends BaseRepository<VendorPermissionEntity, string> {
  findByIdVO(id: PermissionIdVO): Promise<VendorPermissionEntity | null>;
  findByVendor(
    vendorId: VendorIdVO | string,
  ): Promise<readonly VendorPermissionEntity[]>;
  findByMember(
    memberId: TeamMemberIdVO | string,
  ): Promise<VendorPermissionEntity | null>;
  findWithPermission(
    permission: string,
  ): Promise<readonly VendorPermissionEntity[]>;
  findWithOverrides(): Promise<readonly VendorPermissionEntity[]>;
  findWithDenials(): Promise<readonly VendorPermissionEntity[]>;
  findByRole(role: string): Promise<readonly VendorPermissionEntity[]>;
  findPaginated(
    options: VendorPermissionListOptions,
  ): Promise<VendorPermissionPaginationResult>;
  existsByMember(memberId: string): Promise<boolean>;
  countByVendor(vendorId: VendorIdVO | string): Promise<number>;
  getStats(vendorId?: string): Promise<{
    readonly total: number;
    readonly withOverrides: number;
    readonly withDenials: number;
    readonly averageEffectiveCount: number;
    readonly byRole: Readonly<Record<string, number>>;
  }>;
}
