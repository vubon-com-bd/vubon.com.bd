/**
 * Vendor Team Repository Interface
 * @module vendor-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { VendorTeamEntity } from '../entities/vendor-team.entity.js';
import type { VendorIdVO } from '../value-objects/primitives/vendor-id.vo.js';
import type { UserIdVO } from '../value-objects/primitives/user-id.vo.js';
import type { TeamMemberIdVO } from '../value-objects/primitives/team-member-id.vo.js';

export const VENDOR_TEAM_REPOSITORY = Symbol('VENDOR_TEAM_REPOSITORY');

export interface VendorTeamListFilter {
  readonly vendorId?: string;
  readonly userId?: string;
  readonly role?: string | readonly string[];
  readonly status?: string | readonly string[];
  readonly inviteStatus?: string | readonly string[];
  readonly isOwner?: boolean;
  readonly isStale?: boolean;
  readonly hasExpiredInvite?: boolean;
  readonly search?: string;
}

export interface VendorTeamListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'invitedAt' | 'joinedAt' | 'lastActiveAt';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: VendorTeamListFilter;
}

export interface VendorTeamPaginationResult {
  readonly items: readonly VendorTeamEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface VendorTeamRepository
  extends BaseRepository<VendorTeamEntity, string> {
  findByIdVO(id: TeamMemberIdVO): Promise<VendorTeamEntity | null>;
  findByVendor(
    vendorId: VendorIdVO | string,
  ): Promise<readonly VendorTeamEntity[]>;
  findByVendorAndStatus(
    vendorId: VendorIdVO | string,
    status: string,
  ): Promise<readonly VendorTeamEntity[]>;
  findByVendorAndRole(
    vendorId: VendorIdVO | string,
    role: string,
  ): Promise<readonly VendorTeamEntity[]>;
  findByUser(
    userId: UserIdVO | string,
  ): Promise<readonly VendorTeamEntity[]>;
  findByUserAndVendor(
    userId: string,
    vendorId: string,
  ): Promise<VendorTeamEntity | null>;
  findOwner(vendorId: VendorIdVO | string): Promise<VendorTeamEntity | null>;
  findActiveByVendor(
    vendorId: VendorIdVO | string,
  ): Promise<readonly VendorTeamEntity[]>;
  findPendingInvites(
    vendorId: VendorIdVO | string,
  ): Promise<readonly VendorTeamEntity[]>;
  findExpiredInvites(): Promise<readonly VendorTeamEntity[]>;
  findStaleMembers(
    inactiveDays: number,
  ): Promise<readonly VendorTeamEntity[]>;
  findPaginated(
    options: VendorTeamListOptions,
  ): Promise<VendorTeamPaginationResult>;
  existsByUserAndVendor(userId: string, vendorId: string): Promise<boolean>;
  countByVendor(vendorId: VendorIdVO | string): Promise<number>;
  countActiveByVendor(vendorId: VendorIdVO | string): Promise<number>;
  getStats(vendorId?: string): Promise<{
    readonly total: number;
    readonly active: number;
    readonly invited: number;
    readonly suspended: number;
    readonly removed: number;
    readonly byRole: Readonly<Record<string, number>>;
  }>;
}
